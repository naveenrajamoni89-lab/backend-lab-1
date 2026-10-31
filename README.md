# Lab 01: Node.js and Express Server

**Student Name:** RAJAMONI NAVEEN  
**Section:** CSE-2D  
**Subject:** Database / Web Backend Lab  
**GitHub Repository:** [https://github.com/naveenrajamoni89-lab/backend-lab-1](https://github.com/naveenrajamoni89-lab/backend-lab-1)  
**Live Render Deployment:** [https://backend-lab-1-48n6.onrender.com](https://backend-lab-1-48n6.onrender.com)  

---

## 1. Project Overview

This lab demonstrates how to build and structure HTTP servers in Node.js. It covers two foundational approaches:
1. **Core Node.js HTTP Server (`basic-server.js`)**: Uses Node.js's built-in `http` module without any third-party frameworks.
2. **Express.js Server (`server.js`)**: Implements a RESTful HTTP server using Express to handle routing, JSON responses, dynamic data generation, and custom 404 error handling.
3. **Cloud Deployment (Render)**: Hosted live on Render web service with automated builds from GitHub.

---

## 2. Live Deployment Endpoints

The server is publicly accessible at: **`https://backend-lab-1-48n6.onrender.com`**

| Endpoint | Method | Live URL | Description |
| :--- | :---: | :--- | :--- |
| **Welcome** | `GET` | [https://backend-lab-1-48n6.onrender.com/](https://backend-lab-1-48n6.onrender.com/) | Returns server welcome message |
| **About** | `GET` | [https://backend-lab-1-48n6.onrender.com/about](https://backend-lab-1-48n6.onrender.com/about) | Returns student details in JSON |
| **Time** | `GET` | [https://backend-lab-1-48n6.onrender.com/time](https://backend-lab-1-48n6.onrender.com/time) | Returns dynamic server date and time |
| **404 Test** | `GET` | [https://backend-lab-1-48n6.onrender.com/unknown](https://backend-lab-1-48n6.onrender.com/unknown) | Catch-all handler for invalid routes |

---

## 3. Directory Structure

```text
LAB-1/
├── node_modules/       # Installed dependencies
├── .gitignore          # Git ignore file (excludes node_modules)
├── basic-server.js     # Native Node.js HTTP server (Requirement 2)
├── server.js           # Express.js server with all required endpoints (Requirements 3-8)
├── package.json        # Project metadata, scripts, and dependencies
├── package-lock.json   # Lockfile for reproducible installs
└── README.md           # Documentation and laboratory report
```

---

## 4. Installation & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (Node Package Manager)

### Installation
Clone or navigate into the project directory and install the required dependencies:

```bash
git clone https://github.com/naveenrajamoni89-lab/backend-lab-1.git
cd backend-lab-1
npm install
```

---

## 5. Local Execution Commands

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

## 6. API Endpoints Documentation

| HTTP Method | Route | Description | Status Code | Example Response Body |
| :--- | :--- | :--- | :---: | :--- |
| **GET** | `/` | Welcome message | `200 OK` | `Welcome to the Express Server!` |
| **GET** | `/about` | Student name and section | `200 OK` | `{"name":"RAJAMONI NAVEEN","section":"CSE-2D"}` |
| **GET** | `/time` | Current server date & time | `200 OK` | `{"currentTime":"2026-10-31T08:13:35.141Z","formatted":"Sat Oct 31 2026 08:13:35 GMT+0000 (Coordinated Universal Time)"}` |
| **GET** | *Any Undefined Route* (e.g. `/unknown`) | Catch-all 404 handler | `404 Not Found` | `{"error":"Not Found","message":"Cannot GET /unknown"}` |

---

## 7. Verification and Live Test Results

The endpoints were tested on the live deployment via `curl`:

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

{"currentTime":"2026-10-31T08:13:35.141Z","formatted":"Sat Oct 31 2026 08:13:35 GMT+0000 (Coordinated Universal Time)"}
```

### Test 4: `GET /unknown` (404 Fallback)
```http
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{"error":"Not Found","message":"Cannot GET /unknown"}
```

> **Screenshot References:**  
> When submitting the lab assignment, capture screenshots demonstrating:  
> 1. Render Dashboard showing the web service deployed and active.  
> 2. Browser output for `https://backend-lab-1-48n6.onrender.com/`.  
> 3. Browser output for `https://backend-lab-1-48n6.onrender.com/about`.  
> 4. Browser output for `https://backend-lab-1-48n6.onrender.com/time`.  
> 5. Browser output for `https://backend-lab-1-48n6.onrender.com/unknown` verifying the `404 Not Found` status.

---

## 8. Problems Encountered and Solutions

1. **Dynamic Port Binding for Render Deployment**:
   - *Problem:* Cloud platforms like Render assign a dynamic port via the `PORT` environment variable. Hardcoding `app.listen(3000)` causes health check timeouts and deployment failures.
   - *Solution:* Used `const PORT = process.env.PORT || 3000;`, enabling seamless local testing on port 3000 and automatic adaptation to Render's environment.

2. **404 Route Precedence in Express**:
   - *Problem:* Placing the catch-all middleware before defined routes causes all valid endpoints to return 404.
   - *Solution:* Registered the 404 middleware at the very bottom of the middleware stack, after all explicit `app.get(...)` routes have been evaluated.

3. **Standardized JSON Serialization**:
   - *Problem:* While `res.send()` can stringify objects, `res.json()` explicitly sets the `Content-Type: application/json; charset=utf-8` header and formats JSON payloads correctly.
   - *Solution:* Used `res.status(200).json(...)` for all structured endpoints.

---

## 9. Viva Questions & Key Concepts

1. **What is the difference between Node's `http` module and Express?**
   - The `http` module is built into Node.js runtime and provides low-level streaming primitives. Express is a minimalist web framework built on top of `http` that provides intuitive routing, middleware pipelines, and helper methods (`res.json()`, `res.status()`).

2. **Why does the 404 handler not require a path?**
   - In Express, `app.use((req, res) => { ... })` without a route path acts as a default middleware for all incoming requests. Placing it after all legitimate routes ensures it only executes if no previous route handler matched the incoming request.

3. **Why is `process.env.PORT` required when deploying to Render / cloud hosts?**
   - Cloud hosting providers use dynamic port binding and reverse proxies (e.g. Cloudflare, NGINX). Render injects the assigned listening port through the `PORT` environment variable. If the application does not listen on `process.env.PORT`, the reverse proxy cannot forward incoming traffic to the container.
