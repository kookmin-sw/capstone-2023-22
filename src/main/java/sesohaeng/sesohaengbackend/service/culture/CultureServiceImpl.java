package sesohaeng.sesohaengbackend.service.culture;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.area.Area;
import sesohaeng.sesohaengbackend.domain.area.AreaRepository;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.place.PlaceRepository;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CultureServiceImpl implements CultureService{
    private final CultureRepository cultureRepository;

    private final AreaRepository areaRepository;
    private final PlaceRepository placeRepository;

    @Transactional
    public List<CultureResponseDto> getCulturesByArea(Long areaId){
        Area area = areaRepository.findById(areaId).orElseThrow(()->new NoDataException("특구가 존재하지 않습니다."));
        List<Place> places = placeRepository.findAllByArea(area);
        List<CultureResponseDto> responseDtos = new ArrayList<>();
        places.forEach(place -> {
            Culture culture = cultureRepository.findByPlace(place).orElseThrow(()->new NoDataException("해당 문화공간이 존재하지 않습니다."));
            responseDtos.add(new CultureResponseDto(
                    culture.getPlace().getLatitude(),
                    culture.getPlace().getLongitude(),
                    culture.getClassification(),
                    culture.getBorough(),
                    culture.getCultureName(),
                    culture.getCultureDatetime(),
                    culture.getTargetUser(),
                    culture.getFee(),
                    culture.getCast(),
                    culture.getCulture_url(),
                    culture.getCultureImage(),
                    culture.getApplicationDate(),
                    culture.getStartDatetime(),
                    culture.getEndDatetime()
            ));
        });
        return responseDtos;
    }
}
