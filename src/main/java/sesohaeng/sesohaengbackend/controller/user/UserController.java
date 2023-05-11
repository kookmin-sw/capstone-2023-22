package sesohaeng.sesohaengbackend.controller.user;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.user.UserResponseDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.user.UserService;
import sesohaeng.sesohaengbackend.service.user.UserServiceImpl;

@RestController
@Slf4j
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/user")
    public final CommonResponse getUserDetail(@AuthenticationPrincipal CustomUserDetails userDetails){
        log.info("userId = {}",userDetails.getName());

        return SingleResponse.<UserResponseDto>builder()
                .success(true)
                .status(200)
                .message("유저 이름, 유저 이미지 로딩 성공")
                .data(userService.getUserProfile(Long.valueOf(userDetails.getName())))
                .build();
//        return userService.getUserProfile(Long.valueOf(userDetails.getName()));
    }
}
