package com.spring.react.coconamubackend.Controller.Service;

import org.springframework.stereotype.Service;

import com.spring.react.coconamubackend.Entity.UserEntity;
import com.spring.react.coconamubackend.Repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;

    @Transactional
    public String join(UserEntity user) {
        if (user != null) {
            userRepository.save(user);
            return "가입 완료";
        } else {
            return "가입 실패";
        }
    }
}
