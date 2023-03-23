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
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public final FeedServiceResponse saveFeed(@Valid final FeedServiceRequest feedServiceRequest) {
        logger.info("피드 생성");
        User user = userRepository.findByEmail(feedServiceRequest.getUserEmail()).orElseThrow(
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

    private FeedServiceResponse convertFeedResponse(Feed feed) {
        return FeedServiceResponse.of(
                feed.getId(),
                feed.getContent(),
                feed.getCreatedAt()
        );
    }
}
