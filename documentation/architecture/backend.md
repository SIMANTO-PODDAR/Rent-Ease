# Backend Architecture

The backend is a Node.js Express application running out of a single primary file (`index.js`). It is designed to be stateless and deployed as a serverless function on Vercel.

## Single-File Architecture

The entire API, including middleware definitions, database connection handling, and all route definitions, resides in `index.js`.

## Startup Sequence

1. Environment variables loaded via `dotenv`.
2. Global DNS override (forces usage of Google DNS `8.8.8.8`, `8.8.4.4`).
3. Express app instantiation.
4. CORS configuration (dynamically allowing origins defined in `CLIENT_URL`).
5. MongoDB connection initialization (a single shared `client` instance).
6. JWKS fetching (fetches public keys from the frontend for JWT validation).
7. Middleware and Routes attachment.

## Middleware Stack

### 1. `verifyUserToken`

Mandatory for protected routes. Extracts the Bearer token, verifies the JWT signature using `jose-cjs` and the frontend's JWKS, and attaches the decoded payload to `req.user`.

### 2. `extractIdentity`

Used for tracking routes. Attempts to extract user identity from the token, but does not block the request if the token is missing or invalid (allows tracking guest users).

### 3. `verifyRole(...allowedRoles)`

A factory middleware used after `verifyUserToken`. Checks if `req.user.role` is included in the `allowedRoles` array. Returns `403 Forbidden` if unauthorized.

## Database Connection

The MongoDB client is instantiated globally. It connects once during cold start, and subsequent serverless invocations reuse the established connection pool.

## Deployment Configuration

The `vercel.json` file configures the deployment to route all incoming HTTP requests (`/(.*)`) to the `index.js` file, operating as a catch-all serverless function.
