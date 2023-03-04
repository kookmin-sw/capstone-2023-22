package sesohaeng.sesohaengbackend.security.oauth.user;

import sesohaeng.sesohaengbackend.common.AuthProvider;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(AuthProvider authProvider, Map<String,Object> attributes){
        switch (authProvider){
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case GITHUB: return new GithubOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("사용이 불가능한 프로바이더 타입입니다.");
        }
    }
}
