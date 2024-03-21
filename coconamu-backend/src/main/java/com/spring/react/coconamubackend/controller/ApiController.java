package com.spring.react.coconamubackend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.react.coconamubackend.Entity.UserEntity;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ApiController {

    @GetMapping("/api/hello")
    public String getGreeting() {
        return "Hello, Client!";
    }

    @PostMapping("/api/signUp")
    public UserEntity signUp(@RequestBody UserEntity user) {
        UserEntity userEntity = new UserEntity();

        System.out.println(user.getId());
        System.out.println(user.getPassword());
        System.out.println(user.getEmail());

        userEntity.setId(user.getId());
        userEntity.setPassword(user.getPassword());
        return userEntity;
    }

}
