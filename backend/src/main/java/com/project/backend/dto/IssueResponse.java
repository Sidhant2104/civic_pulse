package com.project.backend.dto;

import lombok.Builder;
import lombok.Data;

import com.google.cloud.Timestamp;
@Data
@Builder
public class IssueResponse {

    private String issueId;

    private String description;

    private String departmentId;

    private String status;

    private String createdBy;

    private Timestamp createdAt;
}
