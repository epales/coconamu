package com.spring.react.coconamubackend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.spring.react.coconamubackend.JWT.JwtAuthenticationFilter;
import com.spring.react.coconamubackend.JWT.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws
    // Exception {
    // return httpSecurity
    // // REST API이므로 basic auth 및 csrf 보안을 사용하지 않음
    // .httpBasic().disable()
    // .csrf().disable()
    // // JWT를 사용하기 때문에 세션을 사용하지 않음
    // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    // .and()
    // .authorizeHttpRequests()
    // // 해당 API에 대해서는 모든 요청을 허가
    // .requestMatchers("/members/sign-in").permitAll()
    // // USER 권한이 있어야 요청할 수 있음
    // .requestMatchers("/members/test").hasRole("USER")
    // // 이 밖에 모든 요청에 대해서 인증을 필요로 한다는 설정
    // .anyRequest().authenticated()
    // .and()
    // // JWT 인증을 위하여 직접 구현한 필터를 UsernamePasswordAuthenticationFilter 전에 실행
    // .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
    // UsernamePasswordAuthenticationFilter.class)
    // .build();
    // }

    // 람다식 지원으로 변경
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                // REST API이므로 basic auth 및 csrf 보안을 사용하지 않음
                .httpBasic(basic -> basic.disable())
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 기능 비활성화
                .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS)) // 세션관리 정책을 STATELESS(세션이 있으면 쓰지도 않고, 없으면 만들지도 않는다)
                .authorizeHttpRequests(requests -> requests
                        // USER 권한이 있어야 요청할 수 있음
                        .requestMatchers("/test").hasRole("USER")
                        .requestMatchers("/**", "/error", "/static/**").permitAll()
                        .requestMatchers("/login", "/api/**").permitAll()
                        // 이 밖에 모든 요청에 대해서 인증을 필요없다는 설정
                        .anyRequest().authenticated())
                // JWT 인증을 위하여 직접 구현한 필터를 UsernamePasswordAuthenticationFilter 전에 실행
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt Encoder 사용
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
