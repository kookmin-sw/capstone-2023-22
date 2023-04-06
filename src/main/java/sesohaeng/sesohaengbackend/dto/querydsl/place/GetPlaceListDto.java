package sesohaeng.sesohaengbackend.dto.querydsl.place;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class GetPlaceListDto {
    Long placeId;
    String placeName;

    @QueryProjection
    public GetPlaceListDto(Long placeId, String placeName) {
        this.placeId = placeId;
        this.placeName = placeName;
    }
}
