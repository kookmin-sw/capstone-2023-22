package sesohaeng.sesohaengbackend.dto.response.bookmark;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookmarkResponseDto {
    Long bookmarkId;
    Long placeId;
    String placeName;
}
