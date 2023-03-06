package sesohaeng.sesohaengbackend.security;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import sesohaeng.sesohaengbackend.domain.user.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
@Slf4j
@Getter
// Authentication 객체를 커스텀한 클래스이다
// 필드로는 필요하다고 생각되는 id와 email만 생성했다
public class CustomUserDetails implements UserDetails, OAuth2User {
    private Long id;

    private String email;

    private Collection<? extends  GrantedAuthority> authorities;

    private Map<String, Object> attributes;

    public CustomUserDetails(Long id, String email, Collection<? extends GrantedAuthority> authorities){
        this.id = id;
        this.email = email;
        this.authorities = authorities;
    }

    public static CustomUserDetails create(User user){
        log.info("CustomUserDetails 만들기 1");
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        log.info("CustomUserDetails 만들기 2");
        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                authorities
        );
    }

    public static CustomUserDetails create(User user, Map<String,Object> attributes){
        log.info("CustomUserDetails 만들기 3");
        CustomUserDetails userDetails = CustomUserDetails.create(user);
        log.info("CustomUserDetails 만들기 4");
        userDetails.setAttributes(attributes);
        log.info("CustomUserDetails 만들기 5");
        return userDetails;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    // OAuth2User Override

    @Override
    public String getName() {
        return String.valueOf(id);
    }
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes){
        this.attributes = attributes;
    }
}
