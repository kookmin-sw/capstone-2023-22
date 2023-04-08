package sesohaeng.sesohaengbackend.service.user;

import sesohaeng.sesohaengbackend.dto.response.user.UserResponseDto;

public interface UserService {
    UserResponseDto getUserProfile(Long userId);
}
