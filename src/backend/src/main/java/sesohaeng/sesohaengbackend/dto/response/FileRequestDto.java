package sesohaeng.sesohaengbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FileRequestDto {
    private String imageUrl;

    private String fileName;
}
