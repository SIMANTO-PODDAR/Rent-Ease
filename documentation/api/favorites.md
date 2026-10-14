# Favorites API

Endpoints for managing tenant property favorites (`all-favorites` collection).

## `POST /all-favorites`

- **Auth**: Required. Role: **Tenant**.
- **Description**: Adds a property to a tenant's favorites. The backend checks for duplicates based on `userId` and `propertyId`. If it exists, it does not insert a new record.
- **Body**: Full favorite document fields (see [Data Models](../data-models/favorites.md)).
- **Response**:
  - Success: `{ acknowledged: true, insertedId: "..." }`
  - Duplicate: `{ alreadyExists: true, message: "Property already in favorites" }`

## `GET /all-favorites/:userId`

- **Auth**: Required. Role: **Tenant**.
- **Description**: Returns an array of all favorited properties for the given `userId`.
- **Response**: `[ { ...favorite } ]`

## `DELETE /all-favorites/:itemId`

- **Auth**: Required. Role: **Tenant**.
- **Description**: Removes a favorite. The backend attempts dual-strategy deletion:
  1. It tries to delete by parsing `:itemId` as the `_id` (ObjectId).
  2. If that fails (or it isn't an ObjectId), it attempts to delete by matching `propertyId: itemId` AND the authenticated user's `userId`.
- **Response**: `{ deletedCount: 1, ... }`
