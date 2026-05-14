package com.knowlia.megablogs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.knowlia.megablogs.dto.LoginRequest;
import com.knowlia.megablogs.dto.RegisterRequest;
import com.knowlia.megablogs.entity.User;
import com.knowlia.megablogs.repository.UserRepository;
import com.knowlia.megablogs.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String register(RegisterRequest req) {
        if (repo.findByEmail(req.email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(encoder.encode(req.password)); // hashed

        repo.save(user);

        return jwtUtil.generateToken(user.getEmail());
    }

    public String login(LoginRequest req) {
        User user = repo.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}
