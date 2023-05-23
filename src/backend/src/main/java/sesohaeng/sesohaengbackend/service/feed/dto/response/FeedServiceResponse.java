package sesohaeng.sesohaengbackend.service.feed.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FeedServiceResponse {
    Long id;
    String content;
    String userName;
    String profileImage;
    Long placeId;
    String placeName;
    LocalDateTime updatedAt;
    String imageUrl;
    Integer heartCount;
    Boolean isHeart;

    public static FeedServiceResponse of(Long id, String content, String userName, String profileImage, Long placeId, String placeName, LocalDateTime updatedAt, String imageUrl, Integer heartCount, Boolean isHeart) {
        return new FeedServiceResponse(id, content, userName, profileImage, placeId, placeName, updatedAt, imageUrl, heartCount, isHeart);
    }
}
