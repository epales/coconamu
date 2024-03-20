package com.spring.react.coconamubackend.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;

@Builder
@Entity

public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int seq;

    public String Id;

    public String Password;

    public String email;

    public String gender;
}
