package com.job.smartJob.Controllers;


import com.job.smartJob.DTO.LoginResponse;
import com.job.smartJob.DTO.UserDto;
import com.job.smartJob.Entities.User;
import com.job.smartJob.Services.UserService;
import com.job.smartJob.security.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto dto) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        Optional<User> user = userService.findByEmail(dto.getEmail());
        String token = jwtUtils.generateToken(dto.getEmail());

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // Send proper JSON response with token + user details
        LoginResponse response = new LoginResponse(token, user.get());
        return ResponseEntity.ok(response);
    }

}
