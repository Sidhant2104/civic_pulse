package com.project.backend.service;

import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;

import com.project.backend.dto.CreateIssueRequest;
import com.project.backend.dto.DashboardResponse;
import com.project.backend.dto.IssueResponse;
import com.project.backend.model.Issue;
import com.project.backend.model.IssueStatus;
import com.project.backend.model.IssueStatusHistory;
import com.project.backend.model.Priority;
import com.project.backend.model.User;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;


import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final Firestore firestore;

    public IssueResponse createIssue(CreateIssueRequest request,
                                 String id,
                                 String userRole) throws Exception {

    if (!"CITIZEN".equalsIgnoreCase(userRole)) {
        throw new RuntimeException("Only citizens can create issues");
    }

    String departmentId = assignDepartment(request.getDescription());

    String issueId = firestore.collection("issues")
            .document()
            .getId();

    Priority priority = request.getPriority() != null
            ? request.getPriority()
            : Priority.MEDIUM;

    // 🔥 Find lowest-level official BEFORE creating issue
    User assignedOfficial = findLowestLevelOfficial(departmentId);

    Issue issue = Issue.builder()
            .issueId(issueId)
            .description(request.getDescription())
            .departmentId(departmentId)
            .createdBy(id)
            .createdAt(Timestamp.now())
            .priority(priority)
            .assignedTo(assignedOfficial.getId())   
            .build();

    firestore.collection("issues")
            .document(issueId)
            .set(issue)
            .get();

    createInitialStatus(issueId, id);

    return IssueResponse.builder()
        .issueId(issueId)
        .description(issue.getDescription())
        .departmentId(departmentId)
        .status(IssueStatus.CREATED.name())
        .priority(priority.name())
        .assignedTo(assignedOfficial.getId())  // ✅ ADD
        .createdBy(id)
        .createdAt(issue.getCreatedAt())
        .build();
}


// =============================
    // FIND LOWEST LEVEL OFFICIAL
    // =============================
    private User findLowestLevelOfficial(String departmentId) throws Exception {

        Query query = firestore.collection("users")
                .whereEqualTo("departmentId", departmentId)
                .whereEqualTo("role", "OFFICIAL");

        List<QueryDocumentSnapshot> docs =
                query.get().get().getDocuments();

        User selected = null;

        for (QueryDocumentSnapshot doc : docs) {
            User user = doc.toObject(User.class);

            if (selected == null || user.getLevel() < selected.getLevel()) {
                selected = user;
            }
        }

        if (selected == null) {
            throw new RuntimeException("No official found for department");
        }

        return selected;
    }


    // =========================
    // GET ISSUES (ROLE BASED)
    // =========================
    public List<IssueResponse> getIssues(String id,
                                         String userRole) throws Exception {

        Query query;

        if ("CITIZEN".equalsIgnoreCase(userRole)) {

            query = firestore.collection("issues")
                    .whereEqualTo("createdBy", id);

        } else if ("OFFICIAL".equalsIgnoreCase(userRole)) {

            User user = getUserById(id);

            if (user.getDepartmentId() == null) {
                throw new RuntimeException("Official has no department assigned");
            }

            query = firestore.collection("issues")
                    .whereEqualTo("departmentId", user.getDepartmentId());

        } else if ("ADMIN".equalsIgnoreCase(userRole)) {

            query = firestore.collection("issues");

        } else {
            throw new RuntimeException("Invalid role");
        }

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        List<IssueResponse> responseList = new ArrayList<>();

        for (QueryDocumentSnapshot doc : documents) {

            Issue issue = doc.toObject(Issue.class);

            responseList.add(
                    IssueResponse.builder()
                            .issueId(issue.getIssueId())
                            .description(issue.getDescription())
                            .departmentId(issue.getDepartmentId())
                            .status(getLatestStatus(issue.getIssueId()).name())
                            .priority(issue.getPriority() != null
                                ? issue.getPriority().name()
                                : Priority.MEDIUM.name()
                                )
                            .assignedTo(issue.getAssignedTo())
                            .createdBy(issue.getCreatedBy())
                            .createdAt(issue.getCreatedAt())
                            .build()
            );
        }

        return responseList;
    }



    // =========================
// GET ISSUE BY ID
// =========================
public IssueResponse getIssueById(String issueId,
                                  String userId,
                                  String userRole) throws Exception {

    DocumentSnapshot snapshot = firestore
            .collection("issues")
            .document(issueId)
            .get()
            .get();

    if (!snapshot.exists()) {
        throw new RuntimeException("Issue not found");
    }

    Issue issue = snapshot.toObject(Issue.class);

    // 🔒 Role-based visibility check
    if ("CITIZEN".equalsIgnoreCase(userRole)) {
        if (!issue.getCreatedBy().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }
    }

    if ("OFFICIAL".equalsIgnoreCase(userRole)) {
        User official = getUserById(userId);

        if (official.getDepartmentId() == null ||
                !official.getDepartmentId().equals(issue.getDepartmentId())) {
            throw new RuntimeException("Unauthorized department access");
        }
    }

    return IssueResponse.builder()
            .issueId(issue.getIssueId())
            .description(issue.getDescription())
            .departmentId(issue.getDepartmentId())
            .status(getLatestStatus(issue.getIssueId()).name())
            .priority(issue.getPriority() != null
                    ? issue.getPriority().name()
                    : Priority.MEDIUM.name())
            .assignedTo(issue.getAssignedTo())
            .createdBy(issue.getCreatedBy())
            .createdAt(issue.getCreatedAt())
            .build();
}

    // =========================
    // UPDATE ISSUE STATUS
    // =========================
    public void updateIssueStatus(
            String issueId,
            String id,
            String userRole,
            IssueStatus newStatus) throws Exception {

        if (!"OFFICIAL".equalsIgnoreCase(userRole) &&
            !"ADMIN".equalsIgnoreCase(userRole) &&
            !"CITIZEN".equalsIgnoreCase(userRole)) {

            throw new RuntimeException("Unauthorized role");
        }

        DocumentSnapshot issueSnapshot = firestore
                .collection("issues")
                .document(issueId)
                .get()
                .get();

        if (!issueSnapshot.exists()) {
            throw new RuntimeException("Issue not found");
        }

        Issue issue = issueSnapshot.toObject(Issue.class);

        if ("OFFICIAL".equalsIgnoreCase(userRole)) {

            User official = getUserById(id);

            if (official.getDepartmentId() == null ||
                !official.getDepartmentId().equals(issue.getDepartmentId())) {

                throw new RuntimeException("Unauthorized department access");
            }
        }

        IssueStatus currentStatus = getLatestStatus(issueId);

        validateStatusTransition(currentStatus, newStatus, userRole);

        String statusId = firestore.collection("issueStatusHistory")
                .document()
                .getId();

        IssueStatusHistory history = IssueStatusHistory.builder()
                .statusId(statusId)
                .issueId(issueId)
                .status(newStatus)
                .updatedBy(id)
                .timestamp(Timestamp.now())
                .build();

        firestore.collection("issueStatusHistory")
                .document(statusId)
                .set(history)
                .get();
    }

    // =========================
    // ASSIGN DEPARTMENT
    // =========================
    private String assignDepartment(String description) {

        String desc = description.toLowerCase();

        if (desc.contains("water")) return "dep-water";
        if (desc.contains("light") || desc.contains("electric")) return "dep-electricity";
        if (desc.contains("garbage") || desc.contains("waste")) return "dep-sanitation";

        return "dep-general";
    }

    // =========================
    // CREATE INITIAL STATUS
    // =========================
    private void createInitialStatus(String issueId,
                                     String id) throws Exception {

        String statusId = firestore.collection("issueStatusHistory")
                .document()
                .getId();

        IssueStatusHistory status = IssueStatusHistory.builder()
                .statusId(statusId)
                .issueId(issueId)
                .status(IssueStatus.CREATED)
                .updatedBy(id)
                .timestamp(Timestamp.now())
                .build();

        firestore.collection("issueStatusHistory")
                .document(statusId)
                .set(status)
                .get();
    }

    // =========================
    // GET LATEST STATUS
    // =========================
    private IssueStatus getLatestStatus(String issueId) throws Exception {

        Query query = firestore.collection("issueStatusHistory")
                .whereEqualTo("issueId", issueId)
                .orderBy("timestamp", Query.Direction.DESCENDING)
                .limit(1);

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        if (documents.isEmpty()) {
            throw new RuntimeException("No status history found");
        }

        IssueStatusHistory history =
                documents.get(0).toObject(IssueStatusHistory.class);

        return history.getStatus();
    }

    // =========================
// GET ISSUE STATUS HISTORY
// =========================
public List<IssueStatusHistory> getIssueHistory(String issueId,
                                                String userId,
                                                String userRole) throws Exception {

    DocumentSnapshot snapshot = firestore
            .collection("issues")
            .document(issueId)
            .get()
            .get();

    if (!snapshot.exists()) {
        throw new RuntimeException("Issue not found");
    }

    Issue issue = snapshot.toObject(Issue.class);

    // 🔒 Role validation
    if ("CITIZEN".equalsIgnoreCase(userRole)) {
        if (!issue.getCreatedBy().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }
    }

    if ("OFFICIAL".equalsIgnoreCase(userRole)) {
        User official = getUserById(userId);

        if (official.getDepartmentId() == null ||
                !official.getDepartmentId().equals(issue.getDepartmentId())) {
            throw new RuntimeException("Unauthorized department access");
        }
    }

    Query query = firestore.collection("issueStatusHistory")
            .whereEqualTo("issueId", issueId)
            .orderBy("timestamp", Query.Direction.ASCENDING);

    List<QueryDocumentSnapshot> documents =
            query.get().get().getDocuments();

    List<IssueStatusHistory> historyList = new ArrayList<>();

    for (QueryDocumentSnapshot doc : documents) {
        historyList.add(doc.toObject(IssueStatusHistory.class));
    }

    return historyList;
}

    // =========================
    // FETCH USER
    // =========================
    private User getUserById(String id) throws Exception {

        DocumentSnapshot document =
                firestore.collection("users")
                        .document(id)
                        .get()
                        .get();

        if (!document.exists()) {
            throw new RuntimeException("User not found");
        }

        return document.toObject(User.class);
    }

    // =========================
    // ISSUE VALIDATOR
    // =========================
    private void validateStatusTransition(IssueStatus current,
                                          IssueStatus next,
                                          String role) {

        if (current == IssueStatus.CREATED && next == IssueStatus.IN_PROGRESS) return;

        if (current == IssueStatus.IN_PROGRESS && next == IssueStatus.RESOLVED) return;

        if (current == IssueStatus.RESOLVED &&
            next == IssueStatus.CLOSED &&
            (role.equalsIgnoreCase("ADMIN") || role.equalsIgnoreCase("CITIZEN"))) return;

        if ((current == IssueStatus.CREATED || current == IssueStatus.IN_PROGRESS)
                && next == IssueStatus.ESCALATED) return;

        throw new IllegalArgumentException(
                "Invalid status transition from " + current + " to " + next
        );
    }


        // =========================
        // DASHBOARD AGGREGATION
        // =========================
        public DashboardResponse getDashboard(String id, String userRole) throws Exception {

        Query query;

        if ("CITIZEN".equalsIgnoreCase(userRole)) {

                query = firestore.collection("issues")
                        .whereEqualTo("createdBy", id);

        } else if ("OFFICIAL".equalsIgnoreCase(userRole)) {

                User user = getUserById(id);

                query = firestore.collection("issues")
                        .whereEqualTo("departmentId", user.getDepartmentId());

        } else if ("ADMIN".equalsIgnoreCase(userRole)) {

                query = firestore.collection("issues");

        } else {
                throw new RuntimeException("Invalid role");
        }

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        long total = documents.size();

        Map<String, Long> statusCounts = new java.util.HashMap<>();
        Map<String, Long> priorityCounts = new java.util.HashMap<>();
        Map<String, Long> departmentCounts = new java.util.HashMap<>();

        for (QueryDocumentSnapshot doc : documents) {

                Issue issue = doc.toObject(Issue.class);

                // Priority count
                String priority = issue.getPriority() != null
                ? issue.getPriority().name()
                : Priority.MEDIUM.name();
                priorityCounts.put(priority,
                        priorityCounts.getOrDefault(priority, 0L) + 1);

                // Department count (admin only meaningful)
                String department = issue.getDepartmentId();
                departmentCounts.put(department,
                        departmentCounts.getOrDefault(department, 0L) + 1);

                // Status count (derive from history)
                IssueStatus latestStatus = getLatestStatus(issue.getIssueId());
                String status = latestStatus.name();

                statusCounts.put(status,
                        statusCounts.getOrDefault(status, 0L) + 1);
        }

        return DashboardResponse.builder()
                .totalIssues(total)
                .statusCounts(statusCounts)
                .priorityCounts(priorityCounts)
                .departmentCounts(
                        "ADMIN".equalsIgnoreCase(userRole)
                                ? departmentCounts
                                : null
                )
                .build();
        }



// =========================
// AUTO ESCALATION ENGINE
// =========================
@Scheduled(fixedRate = 60000) // runs every 60 seconds
public void autoEscalateIssues() {

    try {

        Query query = firestore.collection("issues");
        List<QueryDocumentSnapshot> documents =
                query.get().get().getDocuments();

        for (QueryDocumentSnapshot doc : documents) {

            Issue issue = doc.toObject(Issue.class);

            IssueStatus latestStatus =
                    getLatestStatus(issue.getIssueId());

            // Only escalate if still active
            if (latestStatus != IssueStatus.CREATED &&
                latestStatus != IssueStatus.ESCALATED) {
                continue;
            }

            // -------------------------
            // PRIORITY BASED SLA
            // -------------------------
            long escalationTime;

            Priority priority = issue.getPriority() != null
                    ? issue.getPriority()
                    : Priority.MEDIUM;

            switch (priority) {
                case HIGH:
                    escalationTime = 30 * 1000; //5 * 60 * 1000;   // 5 minutes
                    break;
                case MEDIUM:
                    escalationTime = 15 * 60 * 1000;  // 15 minutes
                    break;
                case LOW:
                    escalationTime = 30 * 60 * 1000;  // 30 minutes
                    break;
                default:
                    escalationTime = 15 * 60 * 1000;
            }

            // -------------------------
            // TIME SINCE LAST STATUS CHANGE
            // -------------------------
            IssueStatusHistory latestHistory =
                    getLatestStatusHistory(issue.getIssueId());

            long lastStatusTime =
                    latestHistory.getTimestamp().toDate().getTime();

            long currentTime = System.currentTimeMillis();

            if (currentTime - lastStatusTime < escalationTime) {
                continue;
            }

            // -------------------------
            // SAFETY CHECK
// Get current assigned official
User currentOfficial =
        getUserById(issue.getAssignedTo());

// Find next higher level official
User nextOfficial =
        findNextLevelOfficial(
                issue.getDepartmentId(),
                currentOfficial.getLevel()
        );

// If already highest level → mark SLA breach
if (nextOfficial == null) {

    if (latestStatus != IssueStatus.SLA_BREACHED) {

        String statusId = firestore.collection("issueStatusHistory")
                .document()
                .getId();

        IssueStatusHistory breachHistory =
                IssueStatusHistory.builder()
                        .statusId(statusId)
                        .issueId(issue.getIssueId())
                        .status(IssueStatus.SLA_BREACHED)
                        .updatedBy("SYSTEM")
                        .timestamp(Timestamp.now())
                        .build();

        firestore.collection("issueStatusHistory")
                .document(statusId)
                .set(breachHistory)
                .get();

        log.warn("SLA breached for issue: {}", issue.getIssueId());
    }

    continue;
}

        //     // 🚀 STOP if already highest level
        //     if (nextOfficial == null) {
        //         continue;
        //     }

            // -------------------------
            // REASSIGN ISSUE
            // -------------------------
            firestore.collection("issues")
                    .document(issue.getIssueId())
                    .update("assignedTo", nextOfficial.getId());

            log.info("Reassigned issue to: {}", nextOfficial.getId());
            // -------------------------
            // INSERT ESCALATED HISTORY
            // -------------------------
            String statusId = firestore.collection("issueStatusHistory")
                    .document()
                    .getId();

            IssueStatusHistory history =
                    IssueStatusHistory.builder()
                            .statusId(statusId)
                            .issueId(issue.getIssueId())
                            .status(IssueStatus.ESCALATED)
                            .updatedBy("SYSTEM")
                            .timestamp(Timestamp.now())
                            .build();

            firestore.collection("issueStatusHistory")
                    .document(statusId)
                    .set(history)
                    .get();

           log.info("Escalated issue: {}", issue.getIssueId());
        }

    } catch (Exception e) {
        log.error("Escalation error", e);
    }
}

private User findNextLevelOfficial(String departmentId, int currentLevel) throws Exception {

    Query query = firestore.collection("users")
            .whereEqualTo("departmentId", departmentId)
            .whereEqualTo("role", "OFFICIAL");

    List<QueryDocumentSnapshot> docs =
            query.get().get().getDocuments();

    User next = null;

    for (QueryDocumentSnapshot doc : docs) {
        User user = doc.toObject(User.class);

        if (user.getLevel() > currentLevel) {
            if (next == null || user.getLevel() < next.getLevel()) {
                next = user;
            }
        }
    }

    return next;
}


private IssueStatusHistory getLatestStatusHistory(String issueId) throws Exception {

    Query query = firestore.collection("issueStatusHistory")
            .whereEqualTo("issueId", issueId)
            .orderBy("timestamp", Query.Direction.DESCENDING)
            .limit(1);

    List<QueryDocumentSnapshot> documents =
            query.get().get().getDocuments();

    if (documents.isEmpty()) {
        throw new RuntimeException("No status history found");
    }

    return documents.get(0).toObject(IssueStatusHistory.class);
}

}