package com.spring.react.coconamubackend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.react.coconamubackend.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    List<UserEntity> findById(String id);
}
