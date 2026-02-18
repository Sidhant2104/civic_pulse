package com.project.backend.controller;

import com.project.backend.dto.CreateIssueRequest;
import com.project.backend.dto.IssueResponse;
import com.project.backend.service.IssueService;
import com.project.backend.util.AuthUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;
    private final AuthUtil authUtil;

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
}
