# Users API

Endpoints for platform user administration (`user` collection). Note that registration and authentication endpoints are handled by `better-auth` under `/api/auth/*` and are documented in [Authentication Workflows](../features/authentication/auth-workflows.md).

## `GET /all-user`

- **Auth**: Required. Role: **Admin**.
- **Description**: Returns a paginated list of all registered users on the platform.
- **Query Params**: `page`, `limit` (Default limit: 10).
- **Response**: `{ users: [...], totalUsers, totalPages, currentPage }`

## `PATCH /all-user/:userId`

- **Auth**: Required. Role: **Admin**.
- **Description**: Updates a user's role. Typically used to promote a "Tenant" to an "Owner" or demote an "Owner" to a "Tenant".
- **Body**: `{ role: "Tenant" | "Owner" }`
- **Response**: `{ modifiedCount: 1, ... }`
