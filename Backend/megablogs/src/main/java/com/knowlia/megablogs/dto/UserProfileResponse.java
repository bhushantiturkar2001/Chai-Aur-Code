package com.knowlia.megablogs.dto;

public class UserProfileResponse {
    public Long id;
    public String name;
    public String email;

    public UserProfileResponse(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
