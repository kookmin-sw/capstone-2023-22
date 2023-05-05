package sesohaeng.sesohaengbackend.service.cafe;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CafeServiceImpl implements CafeService{
    private final CafeRepository cafeRepository;
    private final AreaRepository areaRepository;
    private final PlaceRepository placeRepository;
    @Transactional
    @Override
    public List<CafeResponseDto> getCafesByArea(Long areaId){
        Area area = areaRepository.findById(areaId).orElseThrow(()->new NoDataException("특구가 존재하지 않습니다."));
        List<Place> places = placeRepository.findAllByArea(area);
        List<CafeResponseDto> responseDtos = new ArrayList<>();
        places.forEach(place -> {
            Cafe cafe = cafeRepository.findByPlace(place).orElseThrow(() -> new NoDataException("해당 문화공간이 존재하지 않습니다."));
            responseDtos.add(new CafeResponseDto(
                    cafe.getId(),
                    cafe.getCafe_name(),
                    cafe.getPlace().getLatitude(),
                    cafe.getPlace().getLongitude(),
                    cafe.getAddress()
            ));
        });
        return responseDtos;
    }
}
