package sesohaeng.sesohaengbackend.service.cafe;

import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;

import java.util.List;

public interface CafeService {
    List<CafeResponseDto> getCafes();
}
