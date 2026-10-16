# Bookings API

Endpoints for managing bookings and financial transactions (`all-bookings` collection).

## `GET /all-bookings`

- **Auth**: Required. Role: **Admin**.
- **Description**: Returns a paginated list of all bookings on the platform. Used by the Admin "All Bookings" and "Transactions" pages.
- **Query Params**: `page`, `limit` (Default limit: 10).
- **Response**: `{ bookings: [...], totalBookings, totalPages, currentPage }`

## `POST /all-bookings`

- **Auth**: Required. Role: **Tenant**.
- **Description**: Creates a new booking record. The backend automatically initializes `bookingStatus: "Pending"` and `paymentStatus: "Unpaid"`.
- **Body**: Booking creation fields (see [Data Models](../data-models/bookings.md)).
- **Response**: `{ acknowledged: true, insertedId: "..." }`

## `PATCH /all-bookings/:bookingId`

- **Auth**: Required. Role: **Tenant** or **Owner**.
- **Description**: Updates a booking record.
  - **Tenants** call this after successful Stripe payment to set `{ paymentStatus: "Paid", transactionId: "..." }`.
  - **Owners** call this to approve or reject the booking: `{ bookingStatus: "Approved" | "Rejected" }`.
- **Body**: Partial booking fields.
- **Response**: `{ modifiedCount: 1, ... }`

## `GET /tenant-bookings/:tenantId`

- **Auth**: Required. Role: **Tenant**.
- **Description**: Returns all bookings made by the specified tenant. (Not paginated).
- **Response**: `[ { ...booking } ]`

## `GET /owner-bookings/:ownerId`

- **Auth**: Required. Role: **Owner**.
- **Description**: Returns all bookings associated with properties owned by the specified owner.
- **Response**: `[ { ...booking } ]`
