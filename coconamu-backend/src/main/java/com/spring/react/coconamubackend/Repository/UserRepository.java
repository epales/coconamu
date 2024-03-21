package com.spring.react.coconamubackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.react.coconamubackend.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

}
