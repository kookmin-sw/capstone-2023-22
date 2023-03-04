package sesohaeng.sesohaengbackend.security.oauth.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;

import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;


// JWT 토큰을 생성하는 클래스
// Access Token : LocalStorage / Refresh Token : Cookie(http only secure)에 저장한다
// Refresh Token은 DB에 저장하여 갱신시 일치여부 판단을 하는데 사용한다
@Slf4j
@Component
public class JwtTokenProvider {
    private final String SECRET_KEY;
    private final String COOKIE_REFRESH_TOKEN_KEY;

    private final Long ACCESS_TOKEN_EXPIRE_LENGTH = 1000L*60*60; // 1시간
    private final Long REFRESH_TOKEN_EXPIRE_LENGTH = 1000L*60*60*24*7; // 1주일

    private final String AUTHORITIES_KEY = "role";

    @Autowired
    private UserRepository userRepository;

    public JwtTokenProvider(@Value("${app.auth.token.secret-key}")String secretKey,
                            @Value("${app.auth.token.refresh-cookie-key}")String cookieKey){
        this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
        this.COOKIE_REFRESH_TOKEN_KEY = cookieKey;
    }

    public String createAccessToken(Authentication authentication){
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_LENGTH);

        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        String userId = user.getName();
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512,SECRET_KEY)
                .setSubject(userId)
                .claim(AUTHORITIES_KEY,role)
                .setIssuer("debrains")
                .setExpiration(validity)
                .compact();
    }

}
