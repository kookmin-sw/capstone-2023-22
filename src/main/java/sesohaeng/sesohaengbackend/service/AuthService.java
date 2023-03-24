package sesohaeng.sesohaengbackend.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.security.oauth.jwt.JwtTokenProvider;
import sesohaeng.sesohaengbackend.utill.CookieUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {


    @Value("${app.auth.token.refresh-cookie-key}")
    private String cookieKey;

    private final UserRepository userRepository;

    private final JwtTokenProvider tokenProvider;

    public String refreshToken(HttpServletRequest request, HttpServletResponse response, String oldAccessToken){
        // 1. Validation Refresh Token
        String oldRefreshToken = CookieUtil.getCookie(request,cookieKey)
                .map(Cookie::getValue).orElseThrow(()-> new IllegalArgumentException("리프레쉬 토큰 쿠키가 없습니다."));

        if(!tokenProvider.validateToken(oldRefreshToken)){
            throw new IllegalArgumentException("유효한 토큰이 아닙니다.");
        }

        // 2. 유저 정보 얻기
        Authentication authentication = tokenProvider.getAuthentication(oldAccessToken);
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        Long id = Long.valueOf(user.getName());

        // 3. Match Refresh Token
        String savedToken = userRepository.getRefreshTokenById(id);

        if(!savedToken.equals(oldRefreshToken)){
            throw new IllegalArgumentException("리프레쉬 토큰이 일치하지 않습니다.");
        }

        // 4. JWT 갱신
        String accessToken = tokenProvider.createAccessToken(authentication);
        tokenProvider.createRefreshToken(authentication,response);

        return accessToken;
    }

}
