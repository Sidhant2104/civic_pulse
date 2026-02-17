package com.civicpulse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    private String issueId;

    private String description;

    private String departmentId;

    private String createdBy;   // userId

    private LocalDateTime createdAt;

    private LocalDateTime closedAt;

    private String closedBy;    // userId (official who resolved)
}
