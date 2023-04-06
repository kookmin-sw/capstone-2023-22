package sesohaeng.sesohaengbackend.domain.place;

import sesohaeng.sesohaengbackend.dto.querydsl.place.QGetPlaceListDto;

import java.util.List;

public interface PlaceRepositoryCustom {

    List<QGetPlaceListDto> searchPlaceByKeyword(String keyword);
}
