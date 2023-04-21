package sesohaeng.sesohaengbackend.service.culture;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.culture.Culture;
import sesohaeng.sesohaengbackend.domain.culture.CultureRepository;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CultureServiceImpl implements CultureService{
    private CultureRepository cultureRepository;

    @Transactional
    public List<CultureResponseDto> getCultures(){
        List<CultureResponseDto> responseDtos = new ArrayList<>();
        List<Culture> cultures = cultureRepository.findAll();
        cultures.forEach(culture -> {
            responseDtos.add(new CultureResponseDto(
                    culture.getPlace().getLatitude(),
                    culture.getPlace().getLongitude(),
                    culture.getClassification(),
                    culture.getBorough(),
                    culture.getCultureName(),
                    culture.getCultureDatetime(),
                    culture.getPlaceName(),
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
