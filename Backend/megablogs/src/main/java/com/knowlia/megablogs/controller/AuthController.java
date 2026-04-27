package com.knowlia.megablogs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowlia.megablogs.dto.AuthResponse;
import com.knowlia.megablogs.dto.LoginRequest;
import com.knowlia.megablogs.dto.RegisterRequest;
import com.knowlia.megablogs.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        String token = service.register(req);
        return new AuthResponse(token);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        String token = service.login(req);
        return new AuthResponse(token);
    }

    @GetMapping("/profile")
    public String profile(Authentication auth) {
        return "User: " + auth.getName();
    }
}
