package sesohaeng.sesohaengbackend.service.bookmark;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.bookmark.BookMarkRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepositoryImpl;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;
import sesohaeng.sesohaengbackend.dto.response.place.PlaceResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class PlaceService {
    private PlaceRepositoryImpl placeRepositoryImpl;
    private PlaceRepository placeRepository;
    private BookMarkRepository bookMarkRepository;

    private UserRepository userRepository;

    private CultureRepository cultureRepository;

    private CafeRepository cafeRepository;


    @Transactional
    public List<BookmarkResponseDto> getBookmarks(CustomUserDetails user){
        User findUser = userRepository.findById(Long.valueOf(user.getName()))
                .orElseThrow(NoDataException::new);
//        bookMarkRepository.findBy
        return null;
    }

    @Transactional
    public List<GetPlaceListDto> searchPlaceByKeyword(String keyword) {
        return placeRepositoryImpl.searchPlaceByKeyword(keyword);
    }


    @Transactional
    public PlaceResponseDto getPlace(Long placeId) {
        Place place = placeRepository.findById(placeId)
                .orElseThrow(NoDataException::new);

        // 카페인지 컬쳐인지 검증
        Optional<Culture> culture = cultureRepository.findByPlace(place);
        Optional<Cafe> cafe = cafeRepository.findByPlace(place);

        return judgeCafeOrCulture(place, culture, cafe);
    }

    private PlaceResponseDto judgeCafeOrCulture(Place place, Optional<Culture> culture, Optional<Cafe> cafe) {
        if (culture.isEmpty() && cafe.isPresent()) {
            return new PlaceResponseDto(new CafeResponseDto(
                    cafe.get().getId(),
                    cafe.get().getCafe_name(),
                    place.getLatitude(),
                    place.getLongitude(),
                    cafe.get().getAddress()
            ), null);
        } else if (culture.isPresent() && cafe.isEmpty()) {
            return new PlaceResponseDto(null,
                    new CultureResponseDto(
                            place.getLatitude(),
                            place.getLongitude(),
                            culture.get().getClassification(),
                            culture.get().getBorough(),
                            culture.get().getCultureName(),
                            culture.get().getCultureDatetime(),
                            culture.get().getPlaceName(),
                            culture.get().getTargetUser(),
                            culture.get().getFee(),
                            culture.get().getCast(),
                            culture.get().getCulture_url(),
                            culture.get().getCultureImage(),
                            culture.get().getApplicationDate(),
                            culture.get().getStartDatetime(),
                            culture.get().getEndDatetime()
                    ));
        }else{
            return null;
        }
    }
}
