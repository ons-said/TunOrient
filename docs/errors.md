# Error Catalog

This API uses standard HTTP status codes to indicate the success or failure of an API request.

---

## Common Error Codes

| Code | Message                        | Description                                      |
|------|--------------------------------|--------------------------------------------------|
| 400  | Bad Request                    | Invalid request syntax or parameters             |
| 401  | Unauthorized                   | Missing or invalid authentication token          |
| 403  | Forbidden                      | Authenticated but not allowed to access resource |
| 404  | Not Found                      | Resource does not exist                          |
| 409  | Conflict                       | Resource already exists or conflict in request   |
| 422  | Unprocessable Entity           | Validation error in request data                 |
| 500  | Internal Server Error          | Unexpected server error                          |

---

## Example Error Responses

### 400 Bad Request

```json
{
  "detail": "Invalid input data"
}
```

### 401 Unauthorized

```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden

```json
{
  "detail": "You do not have permission to perform this action"
}
```

### 404 Not Found

```json
{
  "detail": "Student not found"
}
```

### 409 Conflict

```json
{
  "detail": "Email already registered"
}
```

### 422 Unprocessable Entity

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

### 500 Internal Server Error

```json
{
  "detail": "Internal server error"
}
```

---

## Notes

- All error responses are returned in JSON format.
- Validation errors include details about which fields failed and why.
- For authentication errors, ensure your token is valid and not expired.