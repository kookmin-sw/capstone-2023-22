package sesohaeng.sesohaengbackend.controller.place;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;
import sesohaeng.sesohaengbackend.dto.response.place.PlaceResponseDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.ListResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.service.place.PlaceService;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class PlaceController {

    private final PlaceService placeService;


    @GetMapping("/place")
    public final CommonResponse searchPlaceByKeyword(
            @RequestParam String keyword
    ){
        return ListResponse.<GetPlaceListDto>builder()
                .success(true)
                .status(200)
                .message("장소 검색 성공")
                .result(placeService.searchPlaceByKeyword(keyword))
                .build();

    }

    @GetMapping("/place/{placeId}")
    public final CommonResponse getPlace( @PathVariable Long placeId
    ){
        return SingleResponse.<PlaceResponseDto>builder()
                .success(true)
                .status(200)
                .message("장소 상세 검색 성공")
                .data(placeService.getPlace(placeId))
                .build();
    }
}
