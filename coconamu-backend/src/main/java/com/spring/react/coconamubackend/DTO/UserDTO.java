package com.spring.react.coconamubackend.DTO;

import org.json.simple.JSONObject;

import com.spring.react.coconamubackend.Entity.UserEntity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int seq;

    public String id;

    public String password;

    public String email;

    public String gender;

    public UserDTO(JSONObject Object) {
        this.seq = Integer.parseInt(Object.get("seq").toString());
        this.id = Object.get("Id").toString();
        this.password = Object.get("Password").toString();
        this.email = Object.get("email").toString();
        this.gender = Object.get("gender").toString();
    }

    public UserEntity toEntity() {
        return UserEntity.builder()
                .seq(seq)
                .id(id)
                .password(password)
                .email(email)
                .gender(gender)
                .build();
    }
}
