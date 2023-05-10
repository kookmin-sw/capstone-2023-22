package sesohaeng.sesohaengbackend.security.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import sesohaeng.sesohaengbackend.common.AuthProvider;
import sesohaeng.sesohaengbackend.common.UserRole;
import sesohaeng.sesohaengbackend.domain.user.User;
import sesohaeng.sesohaengbackend.domain.user.UserRepository;
import sesohaeng.sesohaengbackend.security.CustomUserDetails;
import sesohaeng.sesohaengbackend.security.oauth.user.OAuth2UserInfo;
import sesohaeng.sesohaengbackend.security.oauth.user.OAuth2UserInfoFactory;

import java.util.Optional;

// loadUser()를 오버라이드해서 OAuth2UserRequest에 있는 Access Token으로 유저정보를 얻는다
// 획득한 유저정보를 process()에서 Java Model과 맵핑하고 가입 되지 않은 경우와 이미 가입된 경우를 구분하여 프로세스르 진행한다
// 결과로 OAuth2User를 구현한 CustomUserDetails 객체를 생성한다
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws IllegalArgumentException{
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        
        return process(oAuth2UserRequest,oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());
        if (userInfo.getEmail().isEmpty()){
            throw new IllegalArgumentException("이메일을 찾을 수 없습니다.");
        }

        Optional<User> userOptional = userRepository.findByEmail(userInfo.getEmail());
        User user;

        if(userOptional.isPresent()) { // 이미 가입된 경우
            user = userOptional.get();
            if (authProvider != user.getAuthProvider()) {
                throw new IllegalArgumentException("Auth 프로바이더가 일치하지 않습니다.");
            }
        }else{ // 가입하지 않은 경우

            user = createUser(userInfo,authProvider);
        }

        return CustomUserDetails.create(user, oAuth2User.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        log.info("유저 객체 생성 시작");
        User user = User.builder()
                .email(userInfo.getEmail())
                .profileImage(userInfo.getImageUrl())
                .role(UserRole.USER)
                // state는 없다??
                .authProvider(authProvider)
                .build();
        log.info(" 유저 객체 생성 => ",user.getId(),user.getUsername(),user.getAuthProvider(),user.getEmail());
        return userRepository.save(user);
    }

}
