# Reviews Collection (`all-reviews`)

This collection stores reviews and ratings submitted by Tenants for specific properties.

## Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Unique identifier. |
| `propertyId` | String | References `all-properties._id`. |
| `rating` | Number | Integer between 1 and 5. |
| `reviewText` | String | The body of the review. |
| `userId` | String | References `user.id`. |
| `userName` | String | Snapshot of the reviewer's name. |
| `userImage` | String | Snapshot of the reviewer's profile image. |
| `role` | String | Snapshot of the user's role (expected: "Tenant"). |
| `createdAt` | Date | Timestamp of when the review was submitted. |

## Filtering and Display

- **Property Detail Page**: Fetches all reviews associated with a specific `propertyId`.
- **Homepage Carousel**: Fetches a subset of reviews specifically filtered by `rating: 5` and `role: "Tenant"` to highlight highly-rated properties.
