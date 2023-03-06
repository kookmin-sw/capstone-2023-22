package sesohaeng.sesohaengbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileRequestDto {
    private String imageUrl;

    private String fileName;
}
