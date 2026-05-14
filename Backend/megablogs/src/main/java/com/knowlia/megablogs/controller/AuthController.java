package com.knowlia.megablogs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.knowlia.megablogs.dto.AuthResponse;
import com.knowlia.megablogs.dto.LoginRequest;
import com.knowlia.megablogs.dto.RegisterRequest;
import com.knowlia.megablogs.dto.UserProfileResponse;
import com.knowlia.megablogs.entity.User;
import com.knowlia.megablogs.repository.UserRepository;
import com.knowlia.megablogs.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private UserRepository userRepository;

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

    // GET /api/auth/profile  →  returns full user object { id, name, email }
    @GetMapping("/profile")
    public ResponseEntity<?> profile(Authentication auth) {

        if (auth == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(
            new UserProfileResponse(user.getId(), user.getName(), user.getEmail())
        );
    }
}
