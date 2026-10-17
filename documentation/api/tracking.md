# Tracking API

Endpoints supporting the real-time activity monitoring system.

## `POST /track/session`

- **Auth**: Optional (`extractIdentity`).
- **Description**: Called by the client on route changes and every 60 seconds as a heartbeat. Upserts a session record, tracks page view counts, updates `routeHistory`, and refreshes `lastActiveAt`. Extracts geo-location from Vercel edge headers.
- **Body**: `{ sessionId, visitorId, entryPage, currentPage }`
- **Response**: `{ success: true, ... }`

## `POST /track/event`

- **Auth**: Optional (`extractIdentity`).
- **Description**: Called by the client to track discrete user actions.
- **Body**: `{ sessionId, visitorId, type, metadata }`
- **Response**: `{ success: true, ... }`

## `GET /admin/tracking-stats`

- **Auth**: Required. Role: **Admin**.
- **Description**: Calculates and returns real-time statistics for the Admin activity monitor header. "Active" is defined as `lastActiveAt` within the past 1 minute.
- **Response**: `{ activeNow: 12, guests: 8, tenants: 3, owners: 1 }`

## `GET /admin/tracking-sessions`

- **Auth**: Required. Role: **Admin**.
- **Description**: Returns a paginated list of sessions for the monitor table. Supports filtering by role and status, and searching by ID or IP. Connects session data with user profile data if available.
- **Query Params**: `page`, `limit`, `role`, `status`, `search`.
- **Response**: `{ sessions: [...], pagination: { ... } }`

## `GET /admin/tracking-activities/:sessionId`

- **Auth**: Required. Role: **Admin**.
- **Description**: Returns a chronological array of all events tied to a specific `sessionId`.
- **Response**: `[ { ...activity } ]`
