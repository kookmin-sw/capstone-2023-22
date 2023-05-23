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
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseAreaDto;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CafeServiceImpl implements CafeService{
    private final CafeRepository cafeRepository;
    private final AreaRepository areaRepository;
    private final PlaceRepository placeRepository;
    @Transactional
    @Override
    public List<CafeResponseAreaDto> getCafesByArea(Long areaId){
        Area area = areaRepository.findById(areaId).orElseThrow(()->new NoDataException("특구가 존재하지 않습니다."));
        List<Place> places = placeRepository.findAllByArea(area);
        List<CafeResponseAreaDto> responseDtos = new ArrayList<>();
        for (Place place : places) {
            Optional<Cafe> opCafe = cafeRepository.findByPlace(place);
            if (opCafe.isEmpty()) {
                continue;
            }
            Cafe cafe = opCafe.get();
            responseDtos.add(new CafeResponseAreaDto(
                    place.getArea().getAreaName(),
                    cafe.getId(),
                    cafe.getPlace().getId(),
                    cafe.getCafe_name(),
                    cafe.getPlace().getLatitude(),
                    cafe.getPlace().getLongitude(),
                    cafe.getAddress(),
                    cafe.getTelephone(),
                    cafe.getPostal_code(),
                    cafe.getRoad_address(),
                    cafe.getRoad_postal_code(),
                    cafe.getHomepage()

            ));
        }
        return responseDtos;
    }
}
