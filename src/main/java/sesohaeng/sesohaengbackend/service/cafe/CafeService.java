package sesohaeng.sesohaengbackend.service.cafe;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.cafe.Cafe;
import sesohaeng.sesohaengbackend.domain.cafe.CafeRepository;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CafeService {
    private CafeRepository cafeRepository;
    @Transactional
    public List<CafeResponseDto> getCafes(){
        List<CafeResponseDto> responseDtos = new ArrayList<>();
        List<Cafe> cafes = cafeRepository.findAll();
        cafes.forEach(cafe -> {
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
