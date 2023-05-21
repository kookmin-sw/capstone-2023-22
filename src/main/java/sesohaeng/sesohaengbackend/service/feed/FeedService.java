package sesohaeng.sesohaengbackend.service.feed;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.feed.FeedRepository;
import sesohaeng.sesohaengbackend.domain.feedimage.FeedImage;
import sesohaeng.sesohaengbackend.domain.feedimage.FeedImageRepository;
import sesohaeng.sesohaengbackend.domain.heart.Heart;
import sesohaeng.sesohaengbackend.domain.heart.HeartRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.FileRequestDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.service.S3service;
import sesohaeng.sesohaengbackend.service.feed.dto.request.FeedServiceRequest;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final FeedImageRepository feedImageRepository;
    private final HeartRepository heartRepository;
    private final AreaRepository areaRepository;

    @Autowired
    private S3service s3service;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Transactional
    public FeedServiceResponse saveFeed(@Valid final FeedServiceRequest feedServiceRequest, Long userId, MultipartFile image) {
        logger.info("피드 생성");

        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoDataException("user가 존재하지 않습니다."));
        Place place = placeRepository.findByPlaceName(feedServiceRequest.getPlaceName());

        Feed feed = feedRepository.save(Feed.newInstance(
                feedServiceRequest.getContent(),
                user,
                place
        ));

        FeedImage feedImage = null;
        if(!image.isEmpty()) {
            FileRequestDto storedFile = s3service.upload(image);
            feedImage = feedImageRepository.save(FeedImage.newInstance(storedFile.getImageUrl(), feed));
        }

        // Area의 feedCount 증가
        Area area = place.getArea();
        area.setFeedCount(area.getFeedCount() + 1);
        areaRepository.save(area);

        return convertFeedResponse(feed, feedImage, heartRepository.countByFeedId(feed.getId()), false);
    }

    @Transactional
    public List<FeedServiceResponse> getFeeds(Long userId, int loadedCount, int batchSize) {
        logger.info("피드 리스트");

        List<Feed> feeds = feedRepository.findAllByOrderByCreatedAtDesc();

        // 로드된 피드 개수로부터 페이지 계산
        int page = loadedCount / batchSize;

        // 특정 범위의 피드만 선택
        int fromIndex = Math.min(loadedCount, feeds.size());
        int toIndex = Math.min(loadedCount + batchSize, feeds.size());
        List<Feed> selectedFeeds = feeds.subList(fromIndex, toIndex);

        List<FeedServiceResponse> feedServiceResponses = new LinkedList<>();

        selectedFeeds.forEach(feed -> {
            Boolean isHeart = !Objects.isNull(heartRepository.findByFeedIdAndUserId(feed.getId(), userId));
            feedServiceResponses.add(convertFeedResponse(feed, feedImageRepository.findByFeed(feed), heartRepository.countByFeedId(feed.getId()), isHeart));
        });

        return feedServiceResponses;
    }

    @Transactional
    public FeedServiceResponse getFeed(final Long feedId, Long userId) {
        logger.info("피드 상세 페이지");

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new NoDataException("피드가 존재하지 않습니다."));
        Heart heart = heartRepository.findByFeedIdAndUserId(feedId, userId);

        Boolean isHeart = !Objects.isNull(heart);
        return convertFeedResponse(feed, feedImageRepository.findByFeed(feed), heartRepository.countByFeedId(feed.getId()), isHeart);
    }

    @Transactional
    public FeedServiceResponse updateFeed(final Long feedId, @Valid final FeedServiceRequest feedServiceRequest, Long userId, MultipartFile image) {
        logger.info("피드 수정");

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new NoDataException("피드가 존재하지 않습니다."));
        Place place = placeRepository.findByPlaceName(feedServiceRequest.getPlaceName());
        Heart heart = heartRepository.findByFeedIdAndUserId(feedId, userId);

        userRepository.findById(userId).orElseThrow(() -> new NoDataException("user가 존재하지 않습니다."));

        if(feed.getUser().getId() != userId) {
            throw new IllegalArgumentException("수정 권한이 없습니다");
        }

        Boolean isHeart = !Objects.isNull(heart);
        feed.setContent(feedServiceRequest.getContent());
        feed.setPlace(place);

        Feed modifyFeed = feedRepository.save(feed);

        FeedImage newFeedImage = null;
        if(!image.isEmpty()) {
            FeedImage feedImage = modifyFeed.getImage();
            s3service.deleteImageUrl(feedImage.getImageUrl());
            feedImageRepository.delete(feedImage);
            FileRequestDto storedFile = s3service.upload(image);
            newFeedImage = feedImageRepository.save(FeedImage.newInstance(storedFile.getImageUrl(), modifyFeed));
        }

        return convertFeedResponse(modifyFeed, newFeedImage, heartRepository.countByFeedId(modifyFeed.getId()), isHeart);
    }

    @Transactional
    public boolean deleteFeed(final Long id) {
        logger.info("피드 삭제");
        Feed feed = feedRepository.findById(id).orElseThrow(() -> new NoDataException("피드가 존재하지 않습니다."));

        // Area의 feedCount 감소
        Area area = feed.getPlace().getArea();
        area.setFeedCount(area.getFeedCount() - 1);
        areaRepository.save(area);

        FeedImage feedImage = feed.getImage();
        s3service.deleteImageUrl(feedImage.getImageUrl());
        feedRepository.deleteById(id);

        return true;
    }

    @Transactional
    public List<FeedServiceResponse> getMyFeeds(Long userId) {
        logger.info("내가 쓴 게시물");

        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoDataException("user가 존재하지 않습니다."));
        List<Feed> feeds = feedRepository.findByUserOrderByCreatedAtDesc(user);
        List<FeedServiceResponse> feedServiceResponses = new LinkedList<>();

        for(Feed feed:feeds){
            Boolean isHeart = !Objects.isNull(heartRepository.findByFeedIdAndUserId(feed.getId(), userId));
            feedServiceResponses.add(convertFeedResponse(feed, feedImageRepository.findByFeed(feed), heartRepository.countByFeedId(feed.getId()), isHeart));
        }
        return feedServiceResponses;
    }

    @Transactional
    public Integer heartFeed(final Long feedId, Long userId) {
        logger.info("좋아요 누르기");

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new NoDataException("피드가 존재하지 않습니다."));
        User user = userRepository.findById(userId).orElseThrow(() -> new NoDataException("user가 존재하지 않습니다."));

        heartRepository.save(Heart.newInstance(user, feed));

        Integer heartCount = heartRepository.countByFeedId(feedId);
        return heartCount;
    }

    @Transactional
    public Integer unHeartFeed(final Long feedId, Long userId) {
        logger.info("좋아요 취소");

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new NoDataException("피드가 존재하지 않습니다."));
        User user = userRepository.findById(userId).orElseThrow(() -> new NoDataException("user가 존재하지 않습니다."));

        heartRepository.deleteByFeedAndUser(feed, user);

        Integer heartCount = heartRepository.countByFeedId(feedId);
        return heartCount;
    }

    @Transactional
    public Boolean isHeartFeed(final Long feedId, Long userId) {
        logger.info("좋아요 여부");

        Heart heart = heartRepository.findByFeedIdAndUserId(feedId, userId);

        Boolean isHeart = !Objects.isNull(heart);
        return isHeart;
    }

    @Transactional
    public List<FeedServiceResponse> getMyHeartFeeds(Long userId) {
        logger.info("내가 좋아요한 게시물");

        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoDataException("user가 존재하지 않습니다."));
        List<Heart> hearts = heartRepository.findByUserOrderByFeedCreatedAtDesc(user);
        List<FeedServiceResponse> feedServiceResponses = new LinkedList<>();

        hearts.forEach(heart -> {
            Boolean isHeart = !Objects.isNull(heartRepository.findByFeedIdAndUserId(heart.getFeed().getId(), userId));
            feedServiceResponses.add(convertFeedResponse(heart.getFeed(), feedImageRepository.findByFeed(heart.getFeed()), heartRepository.countByFeedId(heart.getFeed().getId()), isHeart));
        });

        return feedServiceResponses;
    }

    private FeedServiceResponse convertFeedResponse(Feed feed, FeedImage feedImage, Integer heartCount, Boolean isHeart) {
        return FeedServiceResponse.of(
                feed.getId(),
                feed.getContent(),
                feed.getUser().getUsername(),
                feed.getUser().getProfileImage(),
                feed.getPlace().getId(),
                feed.getPlace().getPlaceName(),
                feed.getUpdatedAt(),
                feedImage.getImageUrl(),
                heartCount,
                isHeart
        );
    }
}
