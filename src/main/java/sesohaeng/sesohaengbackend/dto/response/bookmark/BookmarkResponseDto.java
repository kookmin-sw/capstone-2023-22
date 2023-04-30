package sesohaeng.sesohaengbackend.dto.response.bookmark;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookmarkResponseDto {
    Long placeId;
    String placeName;
}
