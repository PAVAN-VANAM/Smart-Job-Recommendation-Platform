package com.job.smartJob.security;


import com.job.smartJob.Repositories.UserRepository;
import com.job.smartJob.Entities.User;                // your entity
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // If your enum is ROLE_USER, ROLE_RECRUITER, pass roles without the ROLE_ prefix:
        String roleName = appUser.getRole().name();
        if (roleName.startsWith("ROLE_")) {
            roleName = roleName.substring("ROLE_".length());
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(appUser.getEmail())
                .password(appUser.getPassword()) // BCrypt-hashed password stored in DB
                .roles(roleName)                 // Spring will add ROLE_ prefix
                .build();
    }
}
