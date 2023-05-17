package sesohaeng.sesohaengbackend.service.culture;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;
import sesohaeng.sesohaengbackend.service.area.AreaServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
@ExtendWith(MockitoExtension.class)
class CultureServiceTest {

    @InjectMocks
    CultureServiceImpl cultureService;

    @Mock
    CultureRepository cultureRepository;

    @Mock
    AreaRepository areaRepository;

    @Mock
    PlaceRepository placeRepository;

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

    // Culture
    String cultureName;


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
        cultureName = "CultureSeyeol";


    }


    @DisplayName("특구 내 존재하는 문화 공간 가져오기")
//    @Test
    void getCulturesByArea() {
        // Arrange
        Area area = Area.newTestInstance(areaId,areaName,areaLatitude,areaLongitude);
        Place place = Place.newTestInstance(placeName,placeLatitude,placeLongitude,area);
        Culture culture = Culture.newTestInstance(cultureName,place);
        List<Place> places = new ArrayList<>();
        places.add(place);
        Optional<Culture> optionalCulture = Optional.of(culture);

        when(areaRepository.findById(anyLong())).thenReturn(Optional.of(area));
        when(placeRepository.findAllByArea(area)).thenReturn(places);
//        when(cultureRepository.findByPlace(any(Place.class))).thenReturn(optionalCulture);


        // when
        List<CultureResponseDto> culturesByArea = cultureService.getCulturesByArea(20172894L);

        // then
        assertThat(culturesByArea.get(0).getCultureName()).isEqualTo("CultureSeyeol");
        log.info("cultureName = {}",culturesByArea.get(0).getCultureName());

    }
}