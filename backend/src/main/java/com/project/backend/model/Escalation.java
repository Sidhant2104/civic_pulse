package com.project.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Escalation {

    private String escalationId;

    private String issueId;

    private String reason;

    private String fromLevel;

    private String toLevel;

    private LocalDateTime escalationTime;
}
