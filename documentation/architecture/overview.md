# System Architecture Overview

Rent-Ease is a full-stack web application separated into a frontend Next.js application and a backend Node.js/Express server.

## Two-Repository Structure

- **Frontend (`rent-ease/`)**: Handles all UI, routing, server-side rendering, and authentication integration (via `better-auth`). Deployed on Vercel.
- **Backend (`rent-ease-server/`)**: Acts as a stateless API server handling business logic and database interactions. Deployed on Vercel.

## Communication Pattern

The frontend and backend communicate securely via HTTP requests:

1. The frontend authenticates the user via `better-auth`.
2. `better-auth` issues a JSON Web Token (JWT).
3. The frontend passes this token in the `Authorization: Bearer <token>` header to the backend API.
4. The backend independently verifies the token signature using the frontend's public JWKS (JSON Web Key Set) endpoint.

## High-Level Data Flow

```text
[ Browser / User ]
       | (HTTPS)
       v
[ Vercel: Next.js Frontend ] <---> [ Stripe Checkout ]
  |   |   |
  |   |   | (Auth calls)
  |   |   +---> [ better-auth DB operations ] -> [ MongoDB ]
  |   |
  |   | (API requests with Bearer JWT)
  |   v
[ Vercel: Express Backend ]
       |
       v
[ MongoDB Atlas Database ]
```

## External Services

- **MongoDB Atlas**: Primary database storing users, properties, bookings, reviews, favorites, and tracking data.
- **Stripe**: Handles secure payment processing for bookings.
- **ImgBB**: Cloud image hosting for property photos (uploaded directly from the client).
- **Google OAuth**: Enables "Sign in with Google".
- **Vercel**: Hosts both the frontend Next.js app and the backend Express API.
