package sesohaeng.sesohaengbackend.security.oauth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import sesohaeng.sesohaengbackend.common.UserRole;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;

import javax.servlet.http.HttpServletResponse;
import java.util.*;
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

    public String createAccessTokenRN(User user, List<UserRole> roles){
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_LENGTH);


        String userId = user.getId().toString();
        String role = roles.stream().map(UserRole::getRole).collect(Collectors.joining(","));
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512,SECRET_KEY)
                .setSubject(userId)
                .claim(AUTHORITIES_KEY,role)
                .setIssuer("debrains")
                .setExpiration(validity)
                .compact();
    }

    public void createRefreshToken(Authentication authentication, HttpServletResponse response){
        Date now = new Date();
        Date validity = new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_LENGTH);

        String refreshToken = Jwts.builder()
                .signWith(SignatureAlgorithm.HS512,SECRET_KEY)
                .setIssuer("debrains")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();

        saveRefreshToken(authentication,refreshToken);

        ResponseCookie cookie = ResponseCookie.from(COOKIE_REFRESH_TOKEN_KEY, refreshToken)
                .httpOnly(true)
                .secure(true)
                // CSRF나 의도하지 않은 정보 유출 취약성 대처
                .sameSite("Lax")
                .maxAge(REFRESH_TOKEN_EXPIRE_LENGTH)
                .path("/")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

    }

    private void saveRefreshToken(Authentication authentication,String refreshToken){
        CustomUserDetails userDetails = (CustomUserDetails)  authentication.getPrincipal();
        Long id = Long.valueOf(userDetails.getName());

        userRepository.updateRefreshToken(id,refreshToken);
    }

    // Access Token을 검사하고 얻은 정보로 Authentication 객체 생성
    public Authentication getAuthentication(String accessToken){
        log.info("getAuthentication");
        Claims claims = parseClaims(accessToken);
        log.info("claims = {}",claims.getSubject());
        Collection<? extends  GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        log.info("authorities = {}",authorities);
        CustomUserDetails principal = new CustomUserDetails(Long.valueOf(claims.getSubject()),"",authorities);
        log.info("principal = {}",principal.getName());

        return new UsernamePasswordAuthenticationToken(principal,"",authorities);
    }
    public Boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            log.info("토큰 검증");
            return true;
        } catch (ExpiredJwtException e){
            log.info("만료된 토큰입니다.");
        } catch(IllegalArgumentException e){
            log.info("잘못된 토큰입니다.");
        }
        return false;
    }


    private Claims parseClaims(String accessToken){
        try{
            return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(accessToken).getBody();

        }catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }

}
