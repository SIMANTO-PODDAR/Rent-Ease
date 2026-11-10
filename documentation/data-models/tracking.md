# Tracking Collections

The tracking system utilizes two collections to monitor real-time user activity across the platform.

## `tracking-sessions`

Stores aggregated session data for active browsers.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | MongoDB identifier. |
| `sessionId` | String | Ephemeral UUID from `sessionStorage` (expires on browser close or inactivity). |
| `visitorId` | String | Persistent UUID from `localStorage`. |
| `userId` | String | References `user.id` (if logged in). |
| `role` | String | "Guest", "Tenant", or "Owner". (Admins are excluded from tracking). |
| `ipAddress` | String | Extracted from network headers. |
| `device` | Object | Contains `browser`, `browserVersion`, `os`, `osVersion`, `deviceType`. |
| `geo` | Object | Contains `country`, `region`, `city` (extracted from Vercel edge headers). |
| `currentPage` | String | The last URL path visited. |
| `entryPage` | String | The first URL path visited in the session. |
| `pageViewCount` | Number | Counter of route changes. |
| `routeHistory` | Array | Circular buffer (max 100 entries) of `{ path, enteredAt, leftAt, durationMs }`. |
| `lastActiveAt` | Date | Timestamp of the last ping or route change. |
| `sessionDurationMs` | Number | Total duration calculated from `startedAt`. |
| `startedAt` | Date | Timestamp when the session began. |
| `status` | String | Currently only uses "active". |

## `tracking-activities`

Stores individual discrete events triggered by users.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | MongoDB identifier. |
| `sessionId` | String | References `tracking-sessions.sessionId`. |
| `visitorId` | String | Persistent visitor UUID. |
| `userId` | String | User ID if logged in. |
| `role` | String | User role. |
| `type` | String Enum | "PROPERTY_VIEW", "BOOKING_INITIATED", "BOOKING_CREATED", "PAYMENT_STARTED", "PAYMENT_COMPLETED". |
| `metadata` | Object | Contextual data specific to the event type (e.g., `propertyId`, `amount`). |
| `createdAt` | Date | Timestamp of the event. |

## Thresholds and Active States

- **Client Expiry**: The `sessionId` expires after 30 minutes of inactivity in the browser's `sessionStorage`.
- **Backend "Active" Threshold**: When the Admin dashboard fetches stats, it considers a session "activeNow" only if `lastActiveAt` is within the last 1 minute.
