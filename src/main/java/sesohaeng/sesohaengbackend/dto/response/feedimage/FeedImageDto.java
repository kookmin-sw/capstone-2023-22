package sesohaeng.sesohaengbackend.dto.response.feedimage;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import sesohaeng.sesohaengbackend.domain.feed.Feed;

import javax.persistence.*;

@Data
@AllArgsConstructor
public class FeedImageDto {
    Long id;

    String imageUrl;

}
