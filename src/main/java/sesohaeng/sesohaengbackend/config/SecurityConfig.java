package sesohaeng.sesohaengbackend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sesohaeng.sesohaengbackend.security.oauth.CookieAuthorizationRequestRepository;
import sesohaeng.sesohaengbackend.security.oauth.CustomOAuth2UserService;
import sesohaeng.sesohaengbackend.security.oauth.OAuth2AuthenticationFailureHandler;
import sesohaeng.sesohaengbackend.security.oauth.OAuth2AuthenticationSuccessHandler;
import sesohaeng.sesohaengbackend.security.oauth.jwt.JwtAccessDeniedHandler;
import sesohaeng.sesohaengbackend.security.oauth.jwt.JwtAuthenticationEntryPoint;
import sesohaeng.sesohaengbackend.security.oauth.jwt.JwtAuthenticationFilter;

//@Configuration
//@EnableWebSecurity
@Slf4j
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final OAuth2AuthenticationSuccessHandler authenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler authenticationFailureHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) -> web.ignoring().antMatchers("/h2-console/**\", \"/favicon.ico");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/oauth2/**", "/auth/**").permitAll()
                .anyRequest().authenticated();

        http.cors() // CORS on
            .and()
                .csrf().disable() // csrf off
                .httpBasic().disable() // basic auth off
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // session off

        http.formLogin().disable()
                .oauth2Login()
                    .authorizationEndpoint()
                        .baseUri("/oauth2/authorize")
                        .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                .and()
                .redirectionEndpoint()
                    .baseUri("/oauth2/callback/*")
                .and()
                .userInfoEndpoint()
                    .userService(customOAuth2UserService)
                .and()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler);

        http.exceptionHandling()
                // 인증에 대한 익셉션 핸들링
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                // 인가에 대한 익셉션 핸들링
                .accessDeniedHandler(jwtAccessDeniedHandler);

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }
}
