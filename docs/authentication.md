# Authentication Guide

## Overview

This API uses **JWT (JSON Web Token) Bearer authentication**.  
All protected endpoints require an `Authorization` header with a valid token.

---

## 1. Register a New User

**Endpoint:**  
`POST /api/v1/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "role": "student" // or "admin", "ministry"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "student"
}
```

---

## 2. Login

**Endpoint:**  
`POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer"
}
```

---

## 3. Using the Token

For all protected endpoints, include the token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

**Example with curl:**
```sh
curl -H "Authorization: Bearer <JWT_TOKEN>" http://localhost:8000/api/v1/students/
```

---

## 4. Get Current User

**Endpoint:**  
`GET /api/v1/auth/me`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "student"
}
```

---

## 5. Common Authentication Errors

- **401 Unauthorized:**  
  - Missing, expired, or invalid token.
  - Wrong token type (should be "Bearer").
- **403 Forbidden:**  
  - Token is valid but user does not have permission for the action.

---

## 6. Token Expiry

Tokens are valid for a limited time (e.g., 1 hour).  
After expiry, you must login again to obtain a new token.

---

## 7. Roles

- **student:** Can access personal data and recommendations.
- **admin:** Can manage users and programs.
- **ministry:** Has full access to all data.

---

## 8. Example Error Response

```json
{
  "detail": "Could not validate credentials"
}
```