package sesohaeng.sesohaengbackend.dto.response.feed;

import lombok.AllArgsConstructor;
import lombok.Data;
import sesohaeng.sesohaengbackend.domain.feedimage.FeedImage;
import sesohaeng.sesohaengbackend.domain.heart.Heart;
import sesohaeng.sesohaengbackend.domain.place.Place;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.dto.response.feedimage.FeedImageDto;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class FeedWithResponseDto {

    Long id;

    String placeName;

    FeedImageDto image;


}
