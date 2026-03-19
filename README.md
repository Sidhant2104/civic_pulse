# 🚀 CivicPulse – Backend (Spring Boot)

## 📌 Overview

CivicPulse is a **citizen issue tracking and escalation system** designed to improve accountability and transparency in public issue management.

The backend is built using **Spring Boot**, implementing secure **JWT-based authentication** and **role-based access control (RBAC)** with a clean layered architecture.

---

## 🎯 Problem Solved

CivicPulse addresses the lack of accountability in issue resolution by providing a structured platform where citizens can report issues, officials can manage them, and admins can oversee escalation and resolution workflows.

---

## ⚙️ Tech Stack

**Backend**

* Java
* Spring Boot

**Security**

* Spring Security
* JWT Authentication

**Database**

* Firebase Firestore

**Architecture**

* Layered Architecture (Controller → Service → Repository)
* DTO Pattern

**Tools**

* Maven
* Postman
* Git & GitHub

---

## 🏗️ Architecture

```
Client
→ Spring Security (JWT Filter)
→ DispatcherServlet
→ Controller Layer
→ Service Layer
→ Repository Layer
→ Firestore Database
```

---

## 🔐 Security Implementation

### Authentication (JWT)

* Stateless authentication using JWT tokens
* Token passed via header:

```
Authorization: Bearer <token>
```

* Custom JWT filter:

  * Extracts token
  * Validates token
  * Sets authentication in SecurityContextHolder

---

### Authorization (RBAC)

Role-based access control implemented using:

```java
@PreAuthorize("hasRole('ADMIN')")
```

**Roles:**

* CITIZEN
* OFFICIAL
* ADMIN

---

## 📡 Sample APIs

```
POST   /api/auth/login
POST   /api/issues
GET    /api/issues/{id}
PUT    /api/issues/{id}/status
```

---

## 🔄 Core Flow (Issue Creation)

1. Client sends request with JWT
2. JWT filter authenticates user
3. Authentication stored in SecurityContextHolder
4. Authorization check applied
5. Controller handles request
6. Service processes logic
7. Data stored in Firestore
8. Response returned

---

## 📂 Project Structure

```
backend/
├── controller/
├── service/
├── repository/
├── dto/
├── model/
├── security/
│   ├── SecurityConfig
│   ├── JwtFilter
│   ├── JwtUtil
├── config/
├── util/
```

---

## ❗ Error Handling

* **401 Unauthorized** → Invalid / expired token
* **403 Forbidden** → Access denied due to insufficient role

---

## 📌 Features

* JWT-based stateless authentication
* Role-based access control (RBAC)
* Secure REST API design
* Structured issue tracking system
* Scalable backend architecture

---

## ▶️ How to Run

1. Clone the repository
2. Configure Firebase credentials
3. Update application configuration
4. Run the Spring Boot application
5. Test APIs using Postman

---

## 🚀 Future Enhancements

* Escalation workflow automation
* Notification system
* Admin dashboard analytics
* Advanced security configurations

---

## 👨‍💻 Author

**Sidhant Singh**

* GitHub: https://github.com/Sidhant2104
* LinkedIn: https://linkedin.com/in/sidhant2104
