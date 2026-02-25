package com.project.backend.controller;

import com.project.backend.dto.CreateIssueRequest;
import com.project.backend.dto.DashboardResponse;
import com.project.backend.dto.IssueResponse;
import com.project.backend.dto.UpdateIssueStatusRequest;
import com.project.backend.model.IssueStatusHistory;
import com.project.backend.service.IssueService;
import com.project.backend.util.AuthUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;
    private final AuthUtil authUtil;

    // =========================
    // CREATE ISSUE
    // =========================
    @PostMapping
    public ResponseEntity<IssueResponse> createIssue(
            @RequestBody CreateIssueRequest request,
            HttpServletRequest httpRequest) throws Exception {

        String userId = authUtil.getUserId(httpRequest);
        String userRole = authUtil.getUserRole(httpRequest);

        IssueResponse response =
                issueService.createIssue(request, userId, userRole);

        return ResponseEntity.ok(response);
    }

    // =========================
    // GET ISSUES
    // =========================
    @GetMapping
    public ResponseEntity<List<IssueResponse>> getIssues(
            HttpServletRequest httpRequest) throws Exception {

        String userId = authUtil.getUserId(httpRequest);
        String userRole = authUtil.getUserRole(httpRequest);

        List<IssueResponse> issues =
                issueService.getIssues(userId, userRole);

        return ResponseEntity.ok(issues);
    }

    // =========================
    // GET ISSUES BY ID
    // =========================
    @GetMapping("/{issueId}")
public ResponseEntity<IssueResponse> getIssueById(
        @PathVariable String issueId,
        HttpServletRequest httpRequest) throws Exception {

    String userId = authUtil.getUserId(httpRequest);
    String userRole = authUtil.getUserRole(httpRequest);

    IssueResponse response =
            issueService.getIssueById(issueId, userId, userRole);

    return ResponseEntity.ok(response);
}

    // =========================
    // UPDATE STATUS
    // =========================
    @PutMapping("/{issueId}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable String issueId,
            @RequestBody UpdateIssueStatusRequest request,
            @RequestHeader("X-USER-ID") String userId,
            @RequestHeader("X-USER-ROLE") String userRole) throws Exception {

        issueService.updateIssueStatus(
                issueId,
                userId,
                userRole,
                request.getStatus()
        );

        return ResponseEntity.ok("Status updated successfully");
    }


        @GetMapping("/dashboard")
        public ResponseEntity<DashboardResponse> getDashboard(
                HttpServletRequest httpRequest) throws Exception {

                String userId = authUtil.getUserId(httpRequest);
                String userRole = authUtil.getUserRole(httpRequest);

                DashboardResponse response =
                issueService.getDashboard(userId, userRole);

                return ResponseEntity.ok(response);
}


// =========================
// GET ISSUE STATUS HISTORY
// =========================

@GetMapping("/{issueId}/history")
public ResponseEntity<List<IssueStatusHistory>> getIssueHistory(
        @PathVariable String issueId,
        HttpServletRequest httpRequest) throws Exception {

    String userId = authUtil.getUserId(httpRequest);
    String userRole = authUtil.getUserRole(httpRequest);

    List<IssueStatusHistory> history =
            issueService.getIssueHistory(issueId, userId, userRole);

    return ResponseEntity.ok(history);
}
}