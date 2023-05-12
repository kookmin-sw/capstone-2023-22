package sesohaeng.sesohaengbackend.service.user;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.user.UserResponseDto;
import sesohaeng.sesohaengbackend.exception.NoDataException;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;


    @Transactional
    public UserResponseDto getUserProfile(Long userId){
        User byId = userRepository.findById(userId)
                .orElseThrow(NoDataException::new);
        return new UserResponseDto(
                byId.getId(),
                byId.getUsername(),
                byId.getProfileImage()
        );
    }
}
