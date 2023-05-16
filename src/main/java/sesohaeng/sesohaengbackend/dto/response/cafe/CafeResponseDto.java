package sesohaeng.sesohaengbackend.dto.response.cafe;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
public class CafeResponseDto {
    Long id;

    Long placeId;

    String cafe_name;

    Double latitude;

    Double longitude;

    String address;
}
