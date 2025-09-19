package com.job.smartJob.ServiceImpl;


import com.job.smartJob.DTO.ProfileDto;
import com.job.smartJob.Entities.Profile;
import com.job.smartJob.Entities.Skill;
import com.job.smartJob.Entities.User;
import com.job.smartJob.Repositories.ProfileRepository;
import com.job.smartJob.Repositories.SkillRepository;
import com.job.smartJob.Repositories.UserRepository;
import com.job.smartJob.Services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Override
    public ProfileDto create(ProfileDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Set<Skill> skills = new HashSet<>();
        if (dto.getSkills() != null) {
            skills = dto.getSkills().stream()
                    .map(name -> skillRepository.findByName(name)
                            .orElseGet(() -> skillRepository.save(Skill.builder().name(name).build())))
                    .collect(Collectors.toSet());
        }

        Profile profile = Profile.builder()
                .name(dto.getName())
                .yearsExperience(dto.getYearsExperience())
                .location(dto.getLocation())
                .desiredSalary(dto.getDesiredSalary())
                .user(user)
                .skills(skills)
                .build();

        profile = profileRepository.save(profile);
        dto.setId(profile.getId());
        return dto;
    }

    @Override
    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

}