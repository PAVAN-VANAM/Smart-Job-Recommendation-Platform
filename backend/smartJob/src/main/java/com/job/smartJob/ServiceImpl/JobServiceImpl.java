package com.job.smartJob.ServiceImpl;


import com.job.smartJob.DTO.JobDto;
import com.job.smartJob.Entities.Job;
import com.job.smartJob.Entities.Skill;
import com.job.smartJob.Repositories.JobRepository;
import com.job.smartJob.Repositories.SkillRepository;
import com.job.smartJob.Services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;

    @Override
    public JobDto create(JobDto dto) {
        Set<Skill> skills = dto.getSkills() != null
                ? dto.getSkills().stream()
                .map(name -> skillRepository.findByName(name)
                        .orElseGet(() -> skillRepository.save(Skill.builder().name(name).build())))
                .collect(Collectors.toSet())
                : Set.of();

        Job job = Job.builder()
                .title(dto.getTitle())
                .company(dto.getCompany())
                .description(dto.getDescription())
                .minExperience(dto.getMinExperience())
                .location(dto.getLocation())
                .salaryMin(dto.getSalaryMin())
                .salaryMax(dto.getSalaryMax())
                .postedAt(LocalDateTime.now())
                .skills(skills)
                .build();

        job = jobRepository.save(job);
        dto.setId(job.getId());
        return dto;
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}
