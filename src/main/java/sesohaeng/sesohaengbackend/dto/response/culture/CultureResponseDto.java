package sesohaeng.sesohaengbackend.dto.response.culture;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
public class CultureResponseDto {
    Double latitude;
    Double longitude;

    String classification;

    String borough;

    String cultureName;

    LocalDateTime cultureDatetime;

    String placeName;

    String targetUser;

    String fee;

    String cast;

    String culture_url;

    String cultureImage;

    Date applicationDate;

    LocalDateTime startDatetime;

    LocalDateTime endDatetime;
}
