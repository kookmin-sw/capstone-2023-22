package sesohaeng.sesohaengbackend.service.place;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepositoryCustom;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PlaceServiceTest {

    @InjectMocks
    PlaceServiceImpl placeService;

    @Mock
    PlaceRepository placeRepository;

    @Mock
    CultureRepository cultureRepository;

    @Mock
    CafeRepository cafeRepository;

    @Mock
    PlaceRepositoryCustom placeRepositoryCustom;


    @BeforeEach
    void init(){
        Long id = 20172894L;

        String areaName = "AreaSeYeol";

        Double latitude = 20172894.11;

        Double longitude = 20172894.22;

        List<Place> places = new ArrayList<>();

        MockitoAnnotations.openMocks(this);

    }

    @Test
    void searchPlaceByKeyword() {
    }

    @Test
    void getPlace() {
    }
}