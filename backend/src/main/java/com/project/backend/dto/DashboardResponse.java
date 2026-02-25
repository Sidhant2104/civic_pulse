package com.project.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class DashboardResponse {

    private long totalIssues;

    private Map<String, Long> statusCounts;

    private Map<String, Long> priorityCounts;

    private Map<String, Long> departmentCounts;
}