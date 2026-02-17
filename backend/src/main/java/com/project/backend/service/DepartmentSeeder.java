package com.project.backend.service;

import com.google.cloud.firestore.Firestore;
import com.project.backend.model.Department;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentSeeder {

    private final Firestore firestore;

    @PostConstruct
    public void seedDepartments() throws Exception {

        createDepartment("dep-electricity", "Electricity");
        createDepartment("dep-water", "Water");
        createDepartment("dep-sanitation", "Sanitation");
        createDepartment("dep-general", "General");
    }

    private void createDepartment(String id, String name) throws Exception {

        Department department = Department.builder()
                .departmentId(id)
                .departmentName(name)
                .build();

        firestore.collection("departments")
                .document(id)
                .set(department);
    }
}
