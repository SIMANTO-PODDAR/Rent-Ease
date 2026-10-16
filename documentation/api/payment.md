# Payment API

This API endpoint is unique because it lives in the **Next.js frontend repository** (`src/app/api/payment/route.js`), not the Express backend. This keeps sensitive Stripe secret keys out of the stateless business API.

## `POST /api/payment`

- **Auth**: Required (checks Next.js session via `auth.api.getSession()`).
- **Description**: Creates a Stripe Checkout Session for a property booking and returns the Stripe redirect URL.
- **Body Format**: `multipart/form-data` (FormData).
- **Body Fields**:
  - `bookingId`: The ID of the pending booking just created.
  - `price`: Rent price (converted to cents internally: `price * 100`).
  - `title`: The property name.
- **Stripe Session Configuration**:
  - `mode`: "payment" (one-time).
  - `success_url`: `{NEXT_PUBLIC_BETTER_AUTH_URL}/paymentSuccessful?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url`: `{NEXT_PUBLIC_BETTER_AUTH_URL}/dashboard/tenant/my-bookings`
  - `metadata`: Stores the `bookingId` inside the Stripe session for retrieval upon success.
- **Response**: `{ url: "https://checkout.stripe.com/..." }`
