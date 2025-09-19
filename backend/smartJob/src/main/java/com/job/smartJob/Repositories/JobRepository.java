package com.job.smartJob.Repositories;

import com.job.smartJob.Entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}