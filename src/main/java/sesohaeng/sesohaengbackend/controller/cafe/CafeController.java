package sesohaeng.sesohaengbackend.controller.cafe;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.cafe.CafeResponseDto;
import sesohaeng.sesohaengbackend.service.cafe.CafeService;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
public class CafeController {
    private CafeService cafeService;

    @GetMapping("/map/cafe")
    public List<CafeResponseDto> getCafes(){
        return cafeService.getCafes();
    }
}
