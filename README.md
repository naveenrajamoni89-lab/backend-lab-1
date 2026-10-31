# Lab 01: Node.js and Express Server

**Student Name:** RAJAMONI NAVEEN  
**Section:** CSE-2D  
**Subject:** Database / Web Backend Lab  

---

## 1. Project Overview

This lab demonstrates how to build and structure HTTP servers in Node.js. It covers two foundational approaches:
1. **Core Node.js HTTP Server (`basic-server.js`)**: Uses Node.js's built-in `http` module without any third-party frameworks.
2. **Express.js Server (`server.js`)**: Implements a RESTful HTTP server using Express to handle routing, JSON responses, dynamic data generation, and custom 404 error handling.

---

## 2. Directory Structure

```text
LAB-1/
├── node_modules/       # Installed dependencies
├── basic-server.js     # Native Node.js HTTP server (Requirement 2)
├── server.js           # Express.js server with all required endpoints (Requirements 3-8)
├── package.json        # Project metadata, scripts, and dependencies
├── package-lock.json   # Lockfile for reproducible installs
└── README.md           # Documentation and laboratory report
```

---

## 3. Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (Node Package Manager)

### Installation
Clone or navigate into the project directory and install the required dependencies:

```bash
npm install
```

---

## 4. Execution Commands

### A. Running the Express Server (Primary)
To start the Express server on port `3000` (or `process.env.PORT`):

```bash
npm start
```
Or directly using Node:
```bash
node server.js
```

### B. Running the Basic HTTP Server
To run the basic server using Node's core `http` module:

```bash
npm run basic
```
Or directly using Node:
```bash
node basic-server.js
```

---

## 5. API Endpoints Documentation (Express Server)

| HTTP Method | Route | Description | Status Code | Example Response |
| :--- | :--- | :--- | :---: | :--- |
| **GET** | `/` | Welcome message | `200 OK` | `Welcome to the Express Server!` |
| **GET** | `/about` | Student name and section | `200 OK` | `{"name":"RAJAMONI NAVEEN","section":"CSE-2D"}` |
| **GET** | `/time` | Current server date & time | `200 OK` | `{"currentTime":"2026-10-31T07:43:01.098Z","formatted":"Sat Oct 31 2026 13:13:01 GMT+0530 (India Standard Time)"}` |
| **GET** | *Any Undefined Route* (e.g. `/unknown`) | Catch-all 404 handler | `404 Not Found` | `{"error":"Not Found","message":"Cannot GET /unknown"}` |

---

## 6. Verification and Test Results

The endpoints were tested using `curl` against a running server. The results below confirm the correct response bodies and HTTP status codes:

### Test 1: `GET /`
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

Welcome to the Express Server!
```

### Test 2: `GET /about`
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"name":"RAJAMONI NAVEEN","section":"CSE-2D"}
```

### Test 3: `GET /time`
```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"currentTime":"2026-10-31T07:43:01.098Z","formatted":"Sat Oct 31 2026 13:13:01 GMT+0530 (India Standard Time)"}
```

### Test 4: `GET /unknown` (404 Fallback)
```http
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{"error":"Not Found","message":"Cannot GET /unknown"}
```

> **Screenshot References:**  
> When submitting the lab assignment, capture terminal or browser screenshots demonstrating:  
> 1. Terminal running `npm start`.  
> 2. Browser or Postman/curl output for `http://localhost:3000/`.  
> 3. Browser or Postman/curl output for `http://localhost:3000/about`.  
> 4. Browser or Postman/curl output for `http://localhost:3000/time`.  
> 5. Browser or Postman/curl output for `http://localhost:3000/unknown` confirming the `404 Not Found` response.

---

## 7. Problems Encountered and Solutions

1. **Port Conflicts**:
   - *Problem:* Running multiple server instances or tests concurrently on port `3000` causes an `EADDRINUSE` error.
   - *Solution:* Used dynamic port selection via `process.env.PORT || 3000` so tests can specify an alternate port without code modifications.

2. **404 Route Precedence in Express**:
   - *Problem:* Placing the catch-all middleware before defined routes causes all valid endpoints to return 404.
   - *Solution:* Registered the 404 middleware at the very bottom of the middleware stack, after all explicit `app.get(...)` routes have been evaluated.

3. **Appropriate Content-Type Serialization**:
   - *Problem:* Using `res.send()` with JavaScript objects works in Express, but explicit `res.json()` makes intention clearer and sets `Content-Type: application/json` reliably.
   - *Solution:* Used `res.status(200).json(...)` for API endpoints and `res.status(200).send(...)` for plaintext welcome messages.

---

## 8. Viva Questions & Key Concepts

1. **What is the difference between Node's `http` module and Express?**
   - The `http` module is built into Node.js runtime and provides low-level streaming primitives. Express is a minimalist web framework built on top of `http` that provides intuitive routing, middleware pipelines, and helper methods (`res.json()`, `res.status()`).

2. **Why does the 404 handler not require a path?**
   - In Express, `app.use((req, res) => { ... })` without a route path acts as a default middleware for all incoming requests. Placing it after all legitimate routes ensures it only executes if no previous route handler matched the incoming request.

3. **How does `new Date()` work on the server?**
   - `new Date()` captures the current system timestamp on the server machine at the exact moment the route handler runs. `toISOString()` formats this timestamp into the standard ISO 8601 UTC format.

