package sesohaeng.sesohaengbackend.controller.feed.dto.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FeedCreateRequest {
    @NotNull
    String content;

    @NotNull
    String placeName;
}
