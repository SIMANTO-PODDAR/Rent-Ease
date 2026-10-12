# API Conventions Overview

All backend endpoints share a common set of conventions, formats, and authentication mechanisms.

## Base URL

The backend API URL is configured in the frontend via the `NEXT_PUBLIC_BASE_URL` environment variable. By default in local development, this is `http://localhost:5000`.

## Authentication & Authorization

All protected routes expect a JSON Web Token (JWT) provided in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

- **`verifyUserToken`**: Middleware that validates the JWT signature cryptographically against the frontend's JWKS endpoint.
- **`verifyRole`**: Middleware appended to routes to enforce RBAC. It checks the `role` field inside the decoded JWT payload.

## Standard Error Responses

Errors are returned with standard HTTP status codes and a JSON body containing a `message`.

- **401 Unauthorized**: Missing, expired, or invalid token.

  ```json
  { "message": "unauthorized access" }
  ```

- **403 Forbidden**: Token is valid, but the user lacks the required role.

  ```json
  { "message": "Forbidden access" }
  ```

- **500 Internal Server Error**: Unhandled backend exception.

  ```json
  { "message": "Internal Server Error" }
  ```

## Pagination Format

Endpoints returning lists of resources (e.g., `/all-properties`, `/all-bookings`) use standard pagination parameters:

- `?page=1` (Default: 1)
- `?limit=15` (Default varies, typically 10 or 15)

The paginated response envelope looks like this:

```json
{
  "properties": [ ... ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 45,
    "limit": 10
  }
}
```

## Data Formats

- **Content-Type**: Requests with bodies must send `application/json`.
- **CORS**: The backend is configured to accept cross-origin requests from the origin(s) specified in the `CLIENT_URL` environment variable, with credentials enabled.
