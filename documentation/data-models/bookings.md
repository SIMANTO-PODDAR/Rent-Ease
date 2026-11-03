# Bookings Collection (`all-bookings`)

This collection represents the central transaction of the platform: a Tenant booking a Property owned by an Owner.

## Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | Unique identifier. |
| `bookingDate` | Date | Timestamp of when the booking was initiated. |
| `bookingStatus` | String Enum | "Pending", "Approved", "Rejected". (Defaults to "Pending") |
| `paymentStatus` | String Enum | "Unpaid", "Paid". (Defaults to "Unpaid") |
| `transactionId` | String | The Stripe `payment_intent` ID, populated after successful payment. |
| `amountPaid` | Number | The property's `rentPrice` captured at the time of booking. |
| `propertyId` | String | References `all-properties._id`. |
| `propertyName` | String | Snapshot of the property title. |
| `ownerId` | String | References `user.id`. |
| `ownerName` | String | Snapshot of the owner's name. |
| `ownerEmail` | String | Snapshot of the owner's email. |
| `tenantId` | String | References `user.id`. |
| `tenantName` | String | User's name from session at time of booking. |
| `tenantEmail` | String | User's email from session at time of booking. |
| `moveInDate` | String | Tenant-provided desired move-in date. |
| `contactNumber` | String | Tenant-provided phone number. |
| `userName` | String | Tenant-provided name from the booking form. |
| `userEmail` | String | Tenant-provided email from the booking form. |
| `additionalNotes` | String | Tenant-provided text notes for the owner. |

## Dual Ledger Usage

The `all-bookings` collection serves two distinct purposes in the UI:

1. **Booking Workflows**: Tracking the approval status between Tenant and Owner.
2. **Transaction Ledger**: When viewed via the Admin Transactions page, this collection acts as the financial ledger by relying on the `paymentStatus` and `transactionId` fields.

## Status Lifecycles

Bookings have two separate state machines that progress independently:

- **Approval Lifecycle**: "Pending" -> "Approved" or "Rejected" (Controlled by the Owner).
- **Payment Lifecycle**: "Unpaid" -> "Paid" (Controlled by Stripe webhook/redirect via the Next.js API).
