package sesohaeng.sesohaengbackend.service.user;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.user.UserResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private UserRepository userRepository;


    @Transactional
    public UserResponseDto getUserProfile(Long userId){
        User byId = userRepository.findById(userId)
                .orElseThrow(NoDataException::new);
        return new UserResponseDto(
                byId.getUsername(),
                byId.getProfileImage()
        );
    }
}
