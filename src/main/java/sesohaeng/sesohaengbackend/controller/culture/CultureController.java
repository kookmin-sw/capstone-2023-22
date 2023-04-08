package sesohaeng.sesohaengbackend.controller.culture;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;
import sesohaeng.sesohaengbackend.service.culture.CultureService;
import sesohaeng.sesohaengbackend.service.culture.CultureServiceImpl;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
public class CultureController {
    private CultureService cultureService;

    @GetMapping("/map/culture")
    public List<CultureResponseDto> getCultures(){
        return cultureService.getCultures();
    }

}
