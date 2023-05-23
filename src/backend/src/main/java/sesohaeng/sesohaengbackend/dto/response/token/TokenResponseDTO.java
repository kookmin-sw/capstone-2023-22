package sesohaeng.sesohaengbackend.dto.response.token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponseDTO {
    private String accessToken;
    private boolean isNewMember;
}
