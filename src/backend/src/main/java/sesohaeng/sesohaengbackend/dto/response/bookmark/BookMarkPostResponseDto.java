package sesohaeng.sesohaengbackend.dto.response.bookmark;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.joda.time.DateTime;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BookMarkPostResponseDto {

    Long id;

    String placeName;

    LocalDateTime createdAt;
}
