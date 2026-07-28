# 🏨 Lakeside Hotel Management System

An enterprise-grade, production-ready Full Stack Hotel Management Application built with **Spring Boot 3.4.2**, **Java 17**, **Spring Security (JWT)**, **Spring Data JPA**, **MySQL**, and **React 19 (Vite + Bootstrap)**.

---

## 🌟 Architecture & Highlights

- **Backend Framework**: Spring Boot 3.4.2 with RESTful APIs, Spring Data JPA, and Spring Security (Stateless JWT).
- **Frontend SPA**: React 19, Vite, Axios, React Router v7, React Bootstrap.
- **Authentication & RBAC**: Role-Based Access Control (`ROLE_USER`, `ROLE_ADMIN`) with BCrypt password hashing and JWT Bearer token authorization.
- **Interactive Room Search**: Real-time room availability filtering engine by Check-in date, Check-out date, and Room Type.
- **Executive Analytics Dashboard**: Live metrics tracking Total Rooms, Total Reservations, Gross Revenue ($), Occupancy Percentage (%), and Total Registered Users.
- **API Documentation**: Automated OpenAPI 3.0 / Swagger UI documentation at `/swagger-ui/index.html`.
- **Containerization**: Multi-stage Dockerfile and Docker Compose orchestration for MySQL and Spring Boot services.

---

## 🚀 REST API Endpoints Overview

| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register-user` | Public | Register a new guest user account |
| `POST` | `/auth/login` | Public | Authenticate user and issue JWT token |
| `GET` | `/rooms/all-rooms` | Public | Fetch all hotel rooms with Base64 photos |
| `GET` | `/rooms/available-rooms` | Public | Search available rooms by dates and type |
| `GET` | `/rooms/types` | Public | List distinct hotel room categories |
| `POST` | `/rooms/add/new-room` | `ROLE_ADMIN` | Add a new room with image attachment |
| `PUT` | `/rooms/update/{roomId}` | `ROLE_ADMIN` | Update room details and price |
| `DELETE` | `/rooms/delete/room/{id}` | `ROLE_ADMIN` | Remove a room from hotel inventory |
| `POST` | `/bookings/room/{id}/booking` | Public / User | Reserve a room for selected dates |
| `GET` | `/bookings/confirmation/{code}`| Public | Lookup booking details by confirmation code |
| `GET` | `/bookings/user/{email}/bookings`| Authenticated | Get guest booking history |
| `DELETE`| `/bookings/booking/{id}/delete` | Authenticated | Cancel an existing reservation |
| `GET` | `/analytics/summary` | `ROLE_ADMIN` | Fetch live hotel revenue & occupancy metrics |
| `GET` | `/users/all` | `ROLE_ADMIN` | List all registered user accounts |

---

## 💻 Quick Start & Setup Guide

### 1. Prerequisites
- **JDK 17** or higher
- **Maven 3.8+**
- **Node.js 18+** & **npm**
- **MySQL 8.0**

### 2. Backend Setup (`lakeside-hotel`)
```bash
cd lakeside-hotel

# Configure database credentials in src/main/resources/application.yml
# Build the project
mvn clean compile

# Run tests
mvn test

# Run application
mvn spring-boot:run
```
*Backend runs at: `http://localhost:9192`*
*Interactive Swagger UI: `http://localhost:9192/swagger-ui/index.html`*

### 3. Frontend Setup (`client/lakeside-hotel`)
```bash
cd client/lakeside-hotel

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 🐳 Docker Deployment

To launch the full stack environment (Spring Boot + MySQL database):

```bash
docker-compose up --build -d
```

---

## 👤 Seeded Default Administrator Account

Upon initial startup, the `DataInitializer` automatically seeds default roles and an administrator account:

- **Email**: `admin@lakesidehotel.com`
- **Password**: `admin123`
- **Roles**: `ROLE_ADMIN`, `ROLE_USER`
# lakeside-hotel
