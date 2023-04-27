package sesohaeng.sesohaengbackend.controller.culture;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.culture.CultureResponseDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.ListResponse;
import sesohaeng.sesohaengbackend.service.culture.CultureService;
import sesohaeng.sesohaengbackend.service.culture.CultureServiceImpl;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
public class CultureController {
    private CultureService cultureService;

    @GetMapping("/area/{areaId}/culture")
    public final CommonResponse getCulturesByArea(@PathVariable Long areaId){
        return ListResponse.<CultureResponseDto>builder()
                .success(true)
                .status(200)
                .message("특구에 맞는 문화 공간들을 찾았습니다.")
                .result(cultureService.getCulturesByArea(areaId))
                .build();
    }

}
