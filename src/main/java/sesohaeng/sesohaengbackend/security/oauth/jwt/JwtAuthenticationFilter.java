package sesohaeng.sesohaengbackend.security.oauth.jwt;
// 모든 Request에서 JWT를 검사하는 필터
// Http Request header에 Authorization : Bearer <JWT> 형태로 전송된 Access Token을 검사하고 유효한다면 TokenProvider에서 생성된 Authentication 객체를 SecurityContext에 저장한다
// 여기서 SecurityContext에 저장된 Authentication 정보는 Controller에서 @AuthenticationPrincipal로 꺼내 사용가능하다
// tokenProvider.getAuthentication()에서 제공된 class타입과 @AuthenticationPrincipal에서 사용하는 class 타입이 일치해야 한다

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


// 모든 Request에서 JWT를 검사하는 필터
// Http Request header에 Authorization : Bearer <JWT> 형태로 전송된 Access Token을 검사하고 유효한다면 TokenProvider에서 생성된 Authentication 객체를 SecurityContext에 저장한다
// 여기서 SecurityContext에 저장된 Authentication 정보는 Controller에서 @AuthenticationPrincipal로 꺼내 사용가능하다
// tokenProvider.getAuthentication()에서 제공된 class타입과 @AuthenticationPrincipal에서 사용하는 class 타입이 일치해야 한다
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = parseBearerToken(request);

        // validation Access Token
        if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug(authentication.getName() + "의 인증정보 저장");
        }else{
            log.debug("유효한 JWT 토큰이 없습니다.");
        }
        filterChain.doFilter(request,response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }
}
