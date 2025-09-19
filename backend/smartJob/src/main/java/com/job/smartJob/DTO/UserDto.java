package com.job.smartJob.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDto {
    private Long id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password; // plaintext on create; will be hashed in service

    private String role; // ROLE_USER / ROLE_RECRUITER
}
