package sesohaeng.sesohaengbackend.dto.response.cafe;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;
import sesohaeng.sesohaengbackend.dto.response.feed.FeedWithResponseDto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Data
@AllArgsConstructor
public class CafeResponseDto {

    String areaName;
    Long id;

    Long placeId;

    String cafe_name;

    Double latitude;

    Double longitude;

    String address;
    @Nullable
    List<FeedWithResponseDto> feeds;
}
