package com.spring.react.coconamubackend.Controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.react.coconamubackend.Entity.EmailMessage;
import com.spring.react.coconamubackend.Entity.UserEntity;
import com.spring.react.coconamubackend.Service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ApiController {

    private final LoginService loginService;

    @GetMapping("/api/hello")
    public String getGreeting() {
        return "Hello, Client!";
    }

    @PostMapping("/api/signUp")
    public void signUp(@RequestBody UserEntity user) {
        UserEntity userEntity = new UserEntity();

        userEntity.setId(user.getId());
        userEntity.setPassword(user.getPassword());
        userEntity.setEmail(user.getEmail());
        userEntity.setGender(user.getGender());

        loginService.join(userEntity);
    }

    @GetMapping("/api/idCheck")
    public boolean checkUser(@RequestParam(value = "id") String user) {

        String message = loginService.findUser(user);

        if (message == "") {
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/email")
    public String sendJoinMail(@RequestBody Map<String, String> email) {
        EmailMessage emailMessage = EmailMessage.builder()
                .toUser(email.get("email"))
                .subject("[CoCoNamu] 이메일 인증을 위한 인증 코드 발송")
                .build();

        String code = loginService.sendMail(emailMessage, "email");
        System.out.println(code);
        return code;
    }
}
