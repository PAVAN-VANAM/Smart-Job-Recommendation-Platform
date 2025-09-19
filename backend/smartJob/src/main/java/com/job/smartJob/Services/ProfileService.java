package com.job.smartJob.Services;

import com.job.smartJob.DTO.ProfileDto;
import com.job.smartJob.Entities.Profile;

import java.util.Optional;

public interface ProfileService {
    ProfileDto create(ProfileDto dto);
    Optional<Profile> getProfileById(Long id);
    Optional<Profile> getProfileByUserId(Long userId);
}
