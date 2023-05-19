package sesohaeng.sesohaengbackend.service.culture;

import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseAreaDto;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;

import java.util.List;

public interface CultureService {
    List<CultureResponseAreaDto> getCulturesByArea(Long areaId);

}
