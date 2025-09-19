package com.job.smartJob.Services;

import com.job.smartJob.DTO.UserDto;
import com.job.smartJob.Entities.User;

import java.util.Optional;

public interface UserService {
    UserDto register(UserDto dto);

    Optional<User> findByEmail(String email);
}
