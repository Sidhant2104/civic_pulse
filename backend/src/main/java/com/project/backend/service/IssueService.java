package com.project.backend.service;

import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;
import com.project.backend.dto.CreateIssueRequest;
import com.project.backend.dto.IssueResponse;
import com.project.backend.model.Issue;
import com.project.backend.model.IssueStatus;
import com.project.backend.model.IssueStatusHistory;
import com.google.cloud.Timestamp;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final Firestore firestore;
    
    public IssueResponse createIssue(CreateIssueRequest request,String userId,String userRole) throws Exception {

    // 1. Validate role
    if (!"CITIZEN".equalsIgnoreCase(userRole)) {
        throw new RuntimeException("Only citizens can create issues");
    }

    // 2. Assign department
    String departmentId = assignDepartment(request.getDescription());

    // 3. Create Issue object
    String issueId = firestore.collection("issues").document().getId();

        Issue issue = Issue.builder()
        .issueId(issueId)
        .description(request.getDescription())
        .departmentId(departmentId)
        .createdBy(userId)
        .createdAt(Timestamp.now())
        .build();


    // 4. Save issue
    firestore.collection("issues")
            .document(issueId)
            .set(issue);

    // 5. Create initial status history
    createInitialStatus(issueId, userId);

    // 6. Return response (temporary null for now)
    return IssueResponse.builder()
        .issueId(issueId)
        .description(issue.getDescription())
        .departmentId(departmentId)
        .status(IssueStatus.CREATED.name())
        .createdBy(userId)
        .createdAt(issue.getCreatedAt())
        .build();
    }

    private String assignDepartment(String description) {

    String desc = description.toLowerCase();

    if (desc.contains("water")) return "dep-water";
    if (desc.contains("light") || desc.contains("electric")) return "dep-electricity";
    if (desc.contains("garbage") || desc.contains("waste")) return "dep-sanitation";

    return "dep-general";
}


private void createInitialStatus(String issueId, String userId) throws Exception {

    String statusId = firestore.collection("issueStatusHistory").document().getId();

    IssueStatusHistory status = IssueStatusHistory.builder()
            .statusId(statusId)
            .issueId(issueId)
            .status(IssueStatus.CREATED)
            .updatedBy(userId)
            .timestamp(Timestamp.now())

            .build();

    firestore.collection("issueStatusHistory")
            .document(statusId)
            .set(status);
}


}