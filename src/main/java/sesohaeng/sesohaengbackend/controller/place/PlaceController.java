package sesohaeng.sesohaengbackend.controller.place;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.querydsl.place.GetPlaceListDto;
import sesohaeng.sesohaengbackend.dto.response.place.PlaceResponseDto;
import sesohaeng.sesohaengbackend.service.bookmark.PlaceService;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class PlaceController {

    private PlaceService placeService;


    @GetMapping("/place")
    public List<GetPlaceListDto> searchPlaceByKeyword(
            @RequestParam String keyword
    ){
        return placeService.searchPlaceByKeyword(keyword);
    }

    @GetMapping("/place/{placeId}")
    public PlaceResponseDto getPlace(
            @PathVariable Long placeId
    ){
        return placeService.getPlace(placeId);
    }
}
