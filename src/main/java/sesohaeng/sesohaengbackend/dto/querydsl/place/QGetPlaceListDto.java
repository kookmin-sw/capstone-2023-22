package sesohaeng.sesohaengbackend.dto.querydsl.place;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class QGetPlaceListDto {
    Long placeId;
    String placeName;

    @QueryProjection
    public QGetPlaceListDto(Long placeId, String placeName) {
        this.placeId = placeId;
        this.placeName = placeName;
    }
}
