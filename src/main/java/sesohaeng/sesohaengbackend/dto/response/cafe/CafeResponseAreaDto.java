package sesohaeng.sesohaengbackend.dto.response.cafe;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CafeResponseAreaDto {

    String areaName;
    Long id;

    Long placeId;

    String cafe_name;

    Double latitude;

    Double longitude;
    String address;
    String telephone;
    String postalCode;
    String roadAddress;
    String roadPostalCode;
    String homepage;
}
