package sesohaeng.sesohaengbackend.dto.response.cafe;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;
import sesohaeng.sesohaengbackend.dto.response.feed.FeedWithResponseDto;
import sesohaeng.sesohaengbackend.service.feed.dto.response.FeedServiceResponse;

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
    String telephone;
    String address;
    String postalCode;
    String roadAddress;
    String roadPostalCode;
    String homepage;

    List<FeedServiceResponse> feeds;
}
