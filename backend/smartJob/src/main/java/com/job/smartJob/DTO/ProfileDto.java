package com.job.smartJob.DTO;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;

@Data
public class ProfileDto {
    private Long id;

    @NotBlank
    private String name;

    private int yearsExperience;

    private String location;

    private int desiredSalary;

    private Long userId;

    private Set<String> skills; // skill names
}
