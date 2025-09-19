package com.job.smartJob.Services;

import com.job.smartJob.DTO.JobDto;
import com.job.smartJob.Entities.Job;

import java.util.List;

public interface JobService {
    JobDto create(JobDto dto);
    List<Job> getAllJobs();
}
