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
    LocalDateTime createdAt;

    public static FeedServiceResponse of(Long id, String content, LocalDateTime createdAt) {
        return new FeedServiceResponse(id, content, createdAt);
    }
}
