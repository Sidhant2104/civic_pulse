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
public class User {

    private String id;;          // Primary ID
    private String name;
    private String email;
    private String phoneNo;

    private String role;            // CITIZEN / OFFICIAL / ADMIN
    private int level; 
    private String department;      // Only for OFFICIAL
    private String departmentId;

    private Timestamp createdAt;
}
