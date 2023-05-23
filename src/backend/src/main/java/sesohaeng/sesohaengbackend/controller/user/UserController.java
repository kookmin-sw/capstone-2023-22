package sesohaeng.sesohaengbackend.controller.user;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.controller.user.dto.request.UpdateUsernameRequest;
import sesohaeng.sesohaengbackend.dto.response.user.UserResponseDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.service.user.UserService;

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
                .message("유저 아이디, 유저 이름, 유저 이미지 로딩 성공")
                .data(userService.getUserProfile(Long.valueOf(userDetails.getName())))
                .build();
//        return userService.getUserProfile(Long.valueOf(userDetails.getName()));
    }

    @PutMapping("/user/username")
    public final CommonResponse updateUsername(
            @RequestBody UpdateUsernameRequest updateUsernameRequest,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return SingleResponse.<String>builder()
                .success(true)
                .status(200)
                .message("닉네임 변경 성공")
                .data(userService.updateUsername(Long.valueOf(customUserDetails.getName()), updateUsernameRequest.getUserName()))
                .build();
    }
}
