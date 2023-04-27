package sesohaeng.sesohaengbackend.service.cafe;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CafeServiceTest {

    @InjectMocks
    CafeServiceImpl cafeService;

    @Mock
    AreaRepository areaRepository;

    @Mock
    PlaceRepository placeRepository;

    @Mock
    CultureRepository cultureRepository;

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

    @Test
    void getCafesByArea() {
    }
}