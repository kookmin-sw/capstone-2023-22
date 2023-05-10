package sesohaeng.sesohaengbackend.controller.auth;


import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sesohaeng.sesohaengbackend.dto.response.token.AccessTokenDto;
import sesohaeng.sesohaengbackend.response.CommonResponse;
import sesohaeng.sesohaengbackend.response.SingleResponse;
import sesohaeng.sesohaengbackend.security.oauth.ReactNativeOAuth2UserService;

@Slf4j
@RestController
@AllArgsConstructor
public class OAuthController {

    private final ReactNativeOAuth2UserService reactNativeOAuth2UserService;

    @GetMapping("/oauth2/google")
    public final CommonResponse oauth2Google(@RequestParam("id_token")String idToken) throws ParseException, JsonProcessingException {

        return SingleResponse.<AccessTokenDto>builder()
                .status(200)
                .success(true)
                .message("엑세스 토큰이 발급되었습니다.")
                .data(reactNativeOAuth2UserService.findOrSaveMember(idToken,"google"))
                .build();
    }
}
