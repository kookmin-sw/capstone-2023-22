package sesohaeng.sesohaengbackend.domain.place;

import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;

import java.util.List;

public interface PlaceRepositoryCustom {

    List<GetPlaceListDto> searchPlaceByKeyword(String keyword);
}
