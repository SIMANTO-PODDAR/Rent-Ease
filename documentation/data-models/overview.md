# Database Models Overview

Rent-Ease uses MongoDB as its primary datastore. The database is accessed via the official MongoDB Node.js driver on the backend, and by `better-auth`'s MongoDB adapter on the frontend.

## Collection Inventory

The database (named `rent-ease`) contains the following collections:

| Collection            | Purpose                                                          | Managed By             |
| --------------------- | ---------------------------------------------------------------- | ---------------------- |
| `all-properties`      | Stores property listings.                                        | Express Backend        |
| `all-bookings`        | Stores property booking and payment records.                     | Express Backend        |
| `all-reviews`         | Stores tenant reviews of properties.                             | Express Backend        |
| `all-favorites`       | Stores tenant property favorites.                                | Express Backend        |
| `user`                | Stores user accounts, Google OAuth profiles, and platform roles. | better-auth (Frontend) |
| `tracking-sessions`   | Real-time active browser sessions.                               | Express Backend        |
| `tracking-activities` | Individual tracking events (e.g., page views, clicks).           | Express Backend        |

## Identifier Types

- Collections managed by the Express backend (`all-properties`, `all-bookings`, `all-reviews`, `all-favorites`) use standard MongoDB **ObjectIds** for their `_id` fields.
- The `user` collection, managed by `better-auth`, uses **string IDs** instead of ObjectIds.

## Relationship Map

Documents relate to each other through the following primary keys:

- `all-bookings.propertyId` references `all-properties._id`
- `all-bookings.tenantId` references `user.id`
- `all-bookings.ownerId` references `user.id`
- `all-reviews.propertyId` references `all-properties._id`
- `all-favorites.propertyId` references `all-properties._id`
- `all-favorites.userId` references `user.id`
- `tracking-activities.sessionId` references `tracking-sessions.sessionId`
