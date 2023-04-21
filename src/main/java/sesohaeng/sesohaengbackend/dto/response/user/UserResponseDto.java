package sesohaeng.sesohaengbackend.dto.response.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class UserResponseDto {

    String userName;

    String profileImage;
}
