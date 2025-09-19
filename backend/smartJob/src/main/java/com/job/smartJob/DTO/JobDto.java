package com.job.smartJob.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class JobDto {
    private Long id;

    @NotBlank
    private String title;

    private String company;

    private String description;

    private int minExperience;

    private String location;

    private int salaryMin;

    private int salaryMax;

    private LocalDateTime postedAt;

    private Set<String> skills; // skill names
}
