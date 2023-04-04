package sesohaeng.sesohaengbackend.controller.area;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.area.AreaResponseDto;
import sesohaeng.sesohaengbackend.service.area.AreaService;

import java.util.List;


@Slf4j
@RestController
@AllArgsConstructor
public class AreaController {
    private AreaService areaService;

    @GetMapping("/map")
    public List<AreaResponseDto> getAreas(){
        return areaService.getAreas();
    }

    @GetMapping("/map/{id}")
    public AreaResponseDto getAreas(@PathVariable Long id){
        return areaService.getArea(id);
    }
}
