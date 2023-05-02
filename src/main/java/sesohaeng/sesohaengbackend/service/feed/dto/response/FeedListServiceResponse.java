package sesohaeng.sesohaengbackend.service.feed.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FeedListServiceResponse {
    List<FeedServiceResponse> feeds;

    public static FeedListServiceResponse newInstance(List<FeedServiceResponse> feeds) {
        return new FeedListServiceResponse(feeds);
    }
}