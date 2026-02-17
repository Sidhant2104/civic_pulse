package com.project.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login Successful");
        response.put("email", email);
        response.put("role", "CITIZEN"); // mock role

        return response;
    }
}
