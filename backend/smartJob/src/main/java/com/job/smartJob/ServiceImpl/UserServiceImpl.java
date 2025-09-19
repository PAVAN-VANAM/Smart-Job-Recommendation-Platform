package com.job.smartJob.ServiceImpl;

import com.job.smartJob.DTO.UserDto;
import com.job.smartJob.Entities.User;
import com.job.smartJob.Repositories.UserRepository;
import com.job.smartJob.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDto register(UserDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(User.Role.valueOf(dto.getRole()))
                .build();

        user = userRepository.save(user);
        dto.setId(user.getId());
        dto.setPassword(null); // never return password
        return dto;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
