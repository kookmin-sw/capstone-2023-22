package sesohaeng.sesohaengbackend.service.feed;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.feed.FeedRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.service.feed.dto.request.FeedServiceRequest;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedListServiceResponse;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public final FeedServiceResponse saveFeed(@Valid final FeedServiceRequest feedServiceRequest, Long userId) {
        logger.info("피드 생성");

        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoDataException("user가 존재하지 않습니다."));
        Place place = placeRepository.findById(feedServiceRequest.getPlaceId()).orElseThrow(
                () -> new NoDataException("place가 존재하지 않습니다.")
        );
        Feed feed = feedRepository.save(Feed.newInstance(
                feedServiceRequest.getContent(),
                user,
                place
        ));
        return convertFeedResponse(feed);
    }

    public final FeedListServiceResponse getFeeds() {
        logger.info("피드 리스트");

        List<Feed> feeds = feedRepository.findAll();
        return FeedListServiceResponse.newInstance(
                feeds.stream().map(feed -> convertFeedResponse(feed)).collect(Collectors.toList())
        );
    }

    public final FeedServiceResponse getFeed(final Long id) {
        logger.info("피드 상세 페이지");

        return convertFeedResponse(feedRepository.findById(id).orElseThrow(
                () -> new NoDataException("피드가 존재하지 않습니다.")
        ));
    }

    public final FeedServiceResponse updateFeed(final Long id, @Valid final FeedServiceRequest feedServiceRequest) {
        logger.info("피드 수정");

        Feed feed = feedRepository.findById(id).orElseThrow(() -> new NoDataException("피드가 존재하지 않습니다."));
        Place place = placeRepository.findById(feedServiceRequest.getPlaceId()).orElseThrow(() -> new NoDataException("장소가 존재하지 않습니다."));
        feed.setContent(feedServiceRequest.getContent());
        feed.setPlace(place);

        Feed modifyFeed = feedRepository.save(feed);
        return convertFeedResponse(modifyFeed);
    }

    public final boolean deleteFeed(final Long id) {
        feedRepository.deleteById(id);
        return true;
    }

    private FeedServiceResponse convertFeedResponse(Feed feed) {
        return FeedServiceResponse.of(
                feed.getId(),
                feed.getContent(),
                feed.getPlace().getId(),
                feed.getCreatedAt()
        );
    }
}
