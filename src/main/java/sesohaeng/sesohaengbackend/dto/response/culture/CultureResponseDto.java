package sesohaeng.sesohaengbackend.dto.response.culture;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;
import sesohaeng.sesohaengbackend.dto.response.feed.FeedWithResponseDto;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class CultureResponseDto {

    String areaName;
    Long id;
    Long placeId;
    Double latitude;
    Double longitude;

    String classification;

    String borough;

    String cultureName;

    String cultureDatetime;

    String targetUser;

    String fee;

    String cast;

    String culture_url;

    String cultureImage;

    Date applicationDate;

    LocalDateTime startDatetime;

    LocalDateTime endDatetime;

    List<FeedServiceResponse> feeds;
}
