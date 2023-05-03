package sesohaeng.sesohaengbackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookMarkRequestDto {

    Long id;
    String type; // type: “cafe" or type: “culture”
}
