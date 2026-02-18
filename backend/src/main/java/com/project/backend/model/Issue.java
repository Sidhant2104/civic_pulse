package com.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.google.cloud.Timestamp;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    private String issueId;

    private String description;

    private String departmentId;

    private String createdBy;   // userId

    private Timestamp createdAt;
    private Timestamp closedAt;


    private String closedBy;    // userId (official who resolved)
}
