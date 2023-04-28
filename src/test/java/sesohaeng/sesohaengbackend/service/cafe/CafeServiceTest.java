package sesohaeng.sesohaengbackend.service.cafe;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
class CafeServiceTest {

    @InjectMocks
    CafeServiceImpl cafeService;

    @Mock
    AreaRepository areaRepository;

    @Mock
    PlaceRepository placeRepository;

    @Mock
    CafeRepository cafeRepository;

    // Area
    Long areaId;
    String areaName;

    Double areaLatitude;

    Double areaLongitude;

    List<Place> places;

    // Place
    String placeName;

    Double placeLatitude;

    Double placeLongitude;

    // Cafe
    String cafeName;

    @BeforeEach
    void init(){
        // Area
        areaId = 20172894L;

        areaName = "AreaSeYeol";

        areaLatitude = 20172894.11;

        areaLongitude = 20172894.22;

        places = new ArrayList<>();

        // Place
        placeName = "AreaSeYeol";

        placeLatitude = 20172894.33;

        placeLongitude = 20172894.44;

        // Culture
        cafeName = "cafeSeyeol";


    }

    @DisplayName("특구 내 존재하는 카페 공간 가져오기")
    @Test
    void getCafesByArea() {

        // Arrange
        Area area = Area.newTestInstance(areaId,areaName,areaLatitude,areaLongitude);
        Place place = Place.newTestInstance(placeName,placeLatitude,placeLongitude,area);
        Cafe cafe = Cafe.newTestInstance(cafeName, place);
        List<Place> places = new ArrayList<>();
        places.add(place);
        Optional<Cafe> optionalCafe = Optional.of(cafe);

        when(areaRepository.findById(anyLong())).thenReturn(Optional.of(area));
        when(placeRepository.findAllByArea(area)).thenReturn(places);
        when(cafeRepository.findByPlace(any(Place.class))).thenReturn(optionalCafe);

        List<CafeResponseDto> cafesByArea = cafeService.getCafesByArea(areaId);

        // then
        Assertions.assertThat(cafesByArea.get(0).getCafe_name()).isEqualTo("cafeSeyeol");
        log.info("cafeName = {}",cafesByArea.get(0).getCafe_name());


    }
}