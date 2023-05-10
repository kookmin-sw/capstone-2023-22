package sesohaeng.sesohaengbackend.security.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import sesohaeng.sesohaengbackend.common.AuthProvider;
import sesohaeng.sesohaengbackend.common.UserRole;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.dto.response.token.AccessTokenDto;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.security.oauth.jwt.JwtTokenProvider;
import sesohaeng.sesohaengbackend.security.oauth.user.OAuth2UserInfo;
import sesohaeng.sesohaengbackend.security.oauth.user.OAuth2UserInfoFactory;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReactNativeOAuth2UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    private final JwtTokenProvider jwtTokenProvider;


    @Transactional
    public AccessTokenDto findOrSaveMember(String id_token, String provider) throws ParseException, JsonProcessingException {
        OAuth2UserInfo oAuth2UserInfo;
        switch (provider){
            case "google":
                oAuth2UserInfo = getGoogleData(id_token);
                AuthProvider authProvider = AuthProvider.GOOGLE;
                int httpStatus = HttpStatus.OK.value();

                Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
                User user;

                if(userOptional.isPresent()) { // 이미 가입된 경우
                    user = userOptional.get();
                    if (authProvider != user.getAuthProvider()) {
                        throw new IllegalArgumentException("Auth 프로바이더가 일치하지 않습니다.");
                    }
                }else{ // 가입하지 않은 경우
                    user = createUser(oAuth2UserInfo,authProvider);
                }

                List<UserRole> roles = new LinkedList<>();

                roles.add(user.getRole());


                String accessTokenRN = jwtTokenProvider.createAccessTokenRN(user, roles);

                return AccessTokenDto.builder()
                        .accessToken(accessTokenRN)
                        .build();


            default:
                throw new IllegalArgumentException("제공하지 않는 인증기관입니다.");
        }

    }

    private OAuth2UserInfo getGoogleData(String idToken) throws ParseException, JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        String googleApi = "https://oauth2.googleapis.com/tokeninfo";
        String targetUrl = UriComponentsBuilder.fromHttpUrl(googleApi).queryParam("id_token", idToken).build().toUriString();

        ResponseEntity<String> response = restTemplate.exchange(targetUrl, HttpMethod.GET,entity, String.class);

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody());

        Map<String,Object> body = new ObjectMapper().readValue(jsonObject.toString(),Map.class);

        return OAuth2UserInfoFactory.getOAuth2UserInfo(AuthProvider.GOOGLE,body);
    }

    private User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        User user = User.builder()
                .email(userInfo.getEmail())
                .profileImage(userInfo.getImageUrl())
                .role(UserRole.USER)
                // state는 없다??
                .authProvider(authProvider)
                .build();
        return userRepository.save(user);
    }

}
