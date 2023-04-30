package sesohaeng.sesohaengbackend.controller.area;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.area.AreaResponseDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.ListResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.service.area.AreaService;
import sesohaeng.sesohaengbackend.service.area.AreaServiceImpl;
import sesohaeng.sesohaengbackend.service.feed.dto.request.FeedServiceRequest;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import java.util.List;


@Slf4j
@RestController
@AllArgsConstructor
public class AreaController {
    private final AreaService areaService;

    @GetMapping("/area")
    public final CommonResponse getAreas(){
        return ListResponse.<AreaResponseDto>builder()
                .success(true)
                .status(200)
                .message("특구 리스트 로딩 성공")
                .result(areaService.getAreas())
                .build();
    }

    @GetMapping("/map/{id}")
    public final CommonResponse getArea(@PathVariable Long id){
        return SingleResponse.<AreaResponseDto>builder()
                .success(true)
                .status(200)
                .message("특구 로딩 성공")
                .data(areaService.getArea(id))
                .build();
    }
}
