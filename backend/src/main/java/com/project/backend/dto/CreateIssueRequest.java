package com.project.backend.dto;

import lombok.Data;

import com.project.backend.model.Priority;

@Data
public class CreateIssueRequest {

    private String description;

    private Priority priority;
}
