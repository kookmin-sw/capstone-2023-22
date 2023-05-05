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
    Long placeId;
    LocalDateTime createdAt;

    public static FeedServiceResponse of(Long id, String content, Long placeId, LocalDateTime createdAt) {
        return new FeedServiceResponse(id, content, placeId, createdAt);
    }
}
