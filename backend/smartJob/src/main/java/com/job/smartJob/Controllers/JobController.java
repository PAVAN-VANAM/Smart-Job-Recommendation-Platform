package com.job.smartJob.Controllers;

import com.job.smartJob.DTO.JobDto;
import com.job.smartJob.Entities.Job;
import com.job.smartJob.Services.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobDto> create(@Valid @RequestBody JobDto dto) {
        return ResponseEntity.ok(jobService.create(dto));
    }

    // GET /api/jobs
    @GetMapping()
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }
}

