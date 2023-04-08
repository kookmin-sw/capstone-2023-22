package sesohaeng.sesohaengbackend.service.area;

import sesohaeng.sesohaengbackend.dto.response.area.AreaResponseDto;

import java.util.List;

public interface AreaService {
    List<AreaResponseDto> getAreas();

    AreaResponseDto getArea(Long id);
}
