package sesohaeng.sesohaengbackend.controller.user;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.user.UserResponseDto;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.user.UserService;
import sesohaeng.sesohaengbackend.service.user.UserServiceImpl;

@RestController
@Slf4j
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/user")
    public UserResponseDto getUserDetail(CustomUserDetails userDetails){
        return userService.getUserProfile(Long.valueOf(userDetails.getName()));
    }
}
