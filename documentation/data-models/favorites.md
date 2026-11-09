# Favorites Collection (`all-favorites`)

This collection stores relationships between Tenants and the Properties they have favorited.

## Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Unique identifier. |
| `userId` | String | References `user.id` (The Tenant). |
| `propertyId` | String | References `all-properties._id`. |
| `propertyName` | String | Snapshot of the property title. |
| `propertyImage` | String | Snapshot of the property image. |
| `propertyLocation` | String | Snapshot of the property location. |
| `propertyPrice` | Number | Snapshot of the rent price. |
| `propertyType` | String | Snapshot of the property type. |
| `createdAt` | Date | Timestamp. |

## Deduplication

The backend explicitly prevents duplicate favorites. Before inserting a new document, the API checks for an existing record matching both `userId` and `propertyId`. If found, it returns an `{ alreadyExists: true }` response rather than creating a duplicate.

## Deletion Strategies

The backend DELETE endpoint (`/all-favorites/:id`) supports two deletion strategies based on the payload:

1. **By Document ID**: If a valid MongoDB ObjectId is passed, it deletes that specific favorite record.
2. **By Property & User**: If an invalid ObjectId is passed, the backend attempts to delete by matching both the `propertyId` and the authenticated `userId`.
