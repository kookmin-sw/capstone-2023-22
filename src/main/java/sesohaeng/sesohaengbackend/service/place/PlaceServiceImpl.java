package sesohaeng.sesohaengbackend.service.place;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMarkRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.feed.Feed;
import sesohaeng.sesohaengbackend.domain.feed.FeedRepository;
import sesohaeng.sesohaengbackend.domain.feedimage.FeedImage;
import sesohaeng.sesohaengbackend.domain.feedimage.FeedImageRepository;
import sesohaeng.sesohaengbackend.domain.heart.HeartRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepositoryCustom;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;
import sesohaeng.sesohaengbackend.dto.response.feed.FeedWithResponseDto;
import sesohaeng.sesohaengbackend.dto.response.feedimage.FeedImageDto;
import sesohaeng.sesohaengbackend.dto.response.place.PlaceResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import java.util.*;

import static sesohaeng.sesohaengbackend.service.feed.FeedService.convertFeedResponse;

@Service
@Slf4j
@AllArgsConstructor
public class PlaceServiceImpl implements PlaceService{

    private final FeedImageRepository feedImageRepository;
    private final FeedRepository feedRepository;
    private final AreaRepository areaRepository;
    private final PlaceRepositoryCustom placeRepositoryCustom;
    private final PlaceRepository placeRepository;
    private final BookMarkRepository bookMarkRepository;

    private final UserRepository userRepository;

    private final CultureRepository cultureRepository;

    private final CafeRepository cafeRepository;
    private final HeartRepository heartRepository;


//    @Transactional
//    public List<BookmarkResponseDto> getBookmarks(CustomUserDetails user){
//        User findUser = userRepository.findById(Long.valueOf(user.getName()))
//                .orElseThrow(NoDataException::new);
////        bookMarkRepository.findBy
//        return null;
//    }

    @Transactional
    public List<GetPlaceListDto> searchPlaceByKeyword(String keyword) {
        return placeRepositoryCustom.searchPlaceByKeyword(keyword);
    }


    @Transactional
    public PlaceResponseDto getPlace(Long placeId, Long userId) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(NoDataException::new);
        log.info("getPlace 도착");
        // 카페인지 컬쳐인지 검증
        List<Culture> cultures = cultureRepository.findAllByPlace(place);
        Optional<Cafe> cafe = cafeRepository.findByPlace(place);

        PlaceResponseDto placeResponseDto = judgeCafeOrCulture(place, userId, cultures, cafe);
        return placeResponseDto;
    }


    private PlaceResponseDto judgeCafeOrCulture(Place place, Long userId, List<Culture> cultures, Optional<Cafe> cafe) {
        log.info("judgeCafeOrCulture 도착");
        List<Feed> feeds = feedRepository.findByPlace(place);

        List<FeedServiceResponse> feedResponse = new LinkedList<>();

        feeds.forEach(feed -> {
            Boolean isHeart = !Objects.isNull(heartRepository.findByFeedIdAndUserId(feed.getId(), userId));
            feedResponse.add(convertFeedResponse(feed, feedImageRepository.findByFeed(feed), heartRepository.countByFeedId(feed.getId()), isHeart));
        });

        if (cultures.isEmpty() && cafe.isPresent()) {
            return new PlaceResponseDto(
                    place.getArea().getAreaName(),
                    new CafeResponseDto(
                            place.getArea().getAreaName(),
                            cafe.get().getId(),
                            cafe.get().getPlace().getId(),
                            cafe.get().getCafe_name(),
                            place.getLatitude(),
                            place.getLongitude(),
                            cafe.get().getTelephone(),
                            cafe.get().getAddress(),
                            cafe.get().getPostal_code(),
                            cafe.get().getRoad_address(),
                            cafe.get().getRoad_postal_code(),
                            cafe.get().getHomepage(),
                            feedResponse
            ), null);
        } else if (!(cultures.isEmpty()) && cafe.isEmpty()) {
            List<CultureResponseDto> cultureResponseDtos = new LinkedList<>();
            for (Culture culture : cultures) {
                cultureResponseDtos.add(
                        new CultureResponseDto(
                                place.getArea().getAreaName(),
                                culture.getId(),
                                culture.getPlace().getId(),
                                place.getLatitude(),
                                place.getLongitude(),
                                culture.getClassification(),
                                culture.getBorough(),
                                culture.getCultureName(),
                                culture.getCultureDatetime(),
                                culture.getTargetUser(),
                                culture.getFee(),
                                culture.getCast(),
                                culture.getCulture_url(),
                                culture.getCultureImage(),
                                culture.getApplicationDate(),
                                culture.getStartDatetime(),
                                culture.getEndDatetime(),
                                feedResponse
                        ));
            }
            return new PlaceResponseDto(
                    place.getArea().getAreaName(),
                    null,
                    cultureResponseDtos);

        }else{
            return null;
        }
    }
}
