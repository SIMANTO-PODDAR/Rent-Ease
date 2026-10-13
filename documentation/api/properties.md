# Properties API

Endpoints for managing and discovering properties (`all-properties` collection).

## `GET /all-properties`

- **Auth**: Public
- **Description**: Returns a paginated list of properties. **Only returns properties with `status: "Approved"`**.
- **Query Params**:
  - `search`: String (matches against `location` via regex).
  - `propertyType`: String (exact match).
  - `sort`: String ("priceAsc" or "priceDesc").
  - `page`: Number.
  - `limit`: Number (Defaults to frontend request limit, backend fallback 6).
- **Response**: `{ properties: [...], pagination: { ... } }`

## `GET /featured-properties`

- **Auth**: Public
- **Description**: Returns an array of the first 6 properties with `status: "Approved"`. Does not use pagination.
- **Response**: `[ { ...property } ]`

## `GET /all-properties/:id`

- **Auth**: Required (`verifyUserToken`). Role: Any.
- **Description**: Returns a single property document by its ObjectId.
- **Response**: `{ _id, title, ... }`

## `GET /all-properties/admin`

- **Auth**: Required. Role: **Admin**.
- **Description**: Returns a paginated list of ALL properties across the platform, regardless of their status (Pending, Approved, or Rejected).
- **Query Params**: `page`, `limit` (Default limit: 15).
- **Response**: `{ properties: [...], pagination: { ... } }`

## `GET /owner-properties/:ownerId`

- **Auth**: Required. Role: **Owner**.
- **Description**: Returns a paginated list of properties belonging to the specified owner ID.
- **Response**: `{ properties: [...], pagination: { ... } }`

## `POST /all-properties`

- **Auth**: Required. Role: **Owner**.
- **Description**: Creates a new property listing. The backend automatically sets `status: "Pending"` and `createdAt`.
- **Body**: Complete property object (see [Data Models](../data-models/properties.md)).
- **Response**: `{ acknowledged: true, insertedId: "..." }`

## `PATCH /all-properties/:propertyId`

- **Auth**: Required. Role: **Owner** or **Admin**.
- **Description**: Updates an existing property.
  - **Note**: If an Owner performs this update, the backend forcibly resets `status: "Pending"` and clears `rejectionFeedback`. If an Admin performs the update (e.g., approving or rejecting), it preserves the provided status.
- **Body**: Partial property fields (e.g., `{ status: "Approved", rejectionFeedback: "" }`).
- **Response**: `{ modifiedCount: 1, ... }`

## `DELETE /all-properties/:propertyId`

- **Auth**: Required. Role: **Owner** or **Admin**.
- **Description**: Permanently deletes a property listing.
- **Response**: `{ deletedCount: 1, ... }`
