# Reviews API

Endpoints for property reviews and ratings (`all-reviews` collection).

## `GET /all-reviews/:id`

- **Auth**: Required (`verifyUserToken`). Role: Any.
- **Description**: Returns an array of all reviews associated with the specified `propertyId`.
- **Response**: `[ { ...review } ]`

## `POST /all-reviews`

- **Auth**: Required. Role: **Tenant**.
- **Description**: Submits a new review for a property.
- **Body**: `{ propertyId, rating, reviewText, ... }`
- **Response**: `{ acknowledged: true, insertedId: "..." }`

## `GET /home-reviews`

- **Auth**: Public
- **Description**: Returns a curated array of 4 reviews for display on the homepage. The backend filters for reviews where `rating` is `5` and `role` is `"Tenant"`.
- **Response**: `[ { ...review } ]`
