package sesohaeng.sesohaengbackend.security.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import sesohaeng.sesohaengbackend.common.AuthProvider;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.security.oauth.user.OAuth2UserInfo;
import sesohaeng.sesohaengbackend.security.oauth.user.OAuth2UserInfoFactory;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReactNativeOAuth2UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;


    @Transactional
    public Map<String, Object> findOrSaveMember(String id_token, String provider) throws ParseException, JsonProcessingException {
        OAuth2UserInfo oAuth2UserInfo;
        switch (provider){
            case "google":
                oAuth2UserInfo = getGoogleData(id_token);
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


    private
}
