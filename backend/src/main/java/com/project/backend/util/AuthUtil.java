package com.project.backend.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    public String getUserId(HttpServletRequest request) {
        return request.getHeader("X-USER-ID");
    }

    public String getUserRole(HttpServletRequest request) {
        return request.getHeader("X-USER-ROLE");
    }
}
