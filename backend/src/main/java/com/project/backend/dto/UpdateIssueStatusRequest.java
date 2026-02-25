package com.project.backend.dto;

import com.project.backend.model.IssueStatus;

public class UpdateIssueStatusRequest {

    private IssueStatus status;

    public IssueStatus getStatus() {
        return status;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }
}