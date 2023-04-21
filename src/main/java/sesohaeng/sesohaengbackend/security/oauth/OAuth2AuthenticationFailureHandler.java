package sesohaeng.sesohaengbackend.security.oauth;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import sesohaeng.sesohaengbackend.utill.CookieUtil;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static sesohaeng.sesohaengbackend.security.oauth.CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

// OAuth2 로그인 실패시 호출되는 Handler
// 인증요청시 생성된 쿠키들을 삭제하고 error를 담아 보낸다
@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    private final CookieAuthorizationRequestRepository authorizationRequestRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                       AuthenticationException exception) throws IOException, ServletException {
        log.info("OAuth2AuthenticationFailureHandler 호출");
        String targetUrl = CookieUtil.getCookie(request,REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse("/");

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        authorizationRequestRepository.removeAuthorizationRequestCookies(request,response);
        getRedirectStrategy().sendRedirect(request,response,targetUrl);
    }
}
