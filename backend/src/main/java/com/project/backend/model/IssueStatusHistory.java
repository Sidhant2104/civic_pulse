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
public class IssueStatusHistory {

    private String statusId;

    private String issueId;

    private IssueStatus status;

    private String updatedBy;   // userId

    private Timestamp timestamp;
}
