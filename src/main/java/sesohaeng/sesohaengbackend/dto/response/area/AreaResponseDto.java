package sesohaeng.sesohaengbackend.dto.response.area;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
public class AreaResponseDto {
    Long areaId;
    String areaName;
    Double latitude;
    Double longitude;
}
