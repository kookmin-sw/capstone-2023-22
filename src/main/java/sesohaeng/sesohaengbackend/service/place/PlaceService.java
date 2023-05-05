package sesohaeng.sesohaengbackend.service.place;

import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;
import sesohaeng.sesohaengbackend.dto.response.bookmark.BookmarkResponseDto;
import sesohaeng.sesohaengbackend.dto.response.place.PlaceResponseDto;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;

import java.util.List;

public interface PlaceService {

    List<GetPlaceListDto> searchPlaceByKeyword(String keyword);
    PlaceResponseDto getPlace(Long placeId);
}
