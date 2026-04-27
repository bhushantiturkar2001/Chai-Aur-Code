package com.knowlia.megablogs.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.knowlia.megablogs.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
