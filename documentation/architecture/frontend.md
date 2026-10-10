# Frontend Architecture

The frontend is a Next.js 16 application using the App Router, React 19, and Tailwind CSS.

## Directory Layout (`src/`)

- `app/`: Next.js App Router root. Contains all routes, layouts, and API handlers.
- `components/`: Reusable React components, organized by feature (e.g., `Booking/`, `OwnerComponents/`, `AdminComponents/`).
- `Sections/`: Homepage-level macro-components (e.g., `Banner.jsx`, `FeaturedProperties.jsx`).
- `lib/`: Shared utilities, singletons, and configurations (`auth.js`, `stripe.js`, `tracking.js`).

## Route Groups

The application uses Next.js Route Groups to share layouts without affecting the URL structure:

- `(auth)`: Routes specifically for authentication (`/authentication`). Does not include the standard navbar/footer.
- `(pages)`: Standard public pages (e.g., `/all-properties`, `/paymentSuccessful`).
- `(legal)`: Legal pages (`/legal`).
- `dashboard/`: A nested directory (not a route group) containing role-specific dashboards (`/dashboard/tenant`, `/dashboard/owner`, `/dashboard/admin`), sharing a common `DashboardSidebar` layout.

## Middleware & Route Protection

Route protection is handled in two layers:

1. **`src/proxy.js`**: Functions similarly to Next.js middleware. It redirects unauthenticated users attempting to access `/all-properties/:id` or `/dashboard/*` to `/authentication`.
2. **Server-Side Layouts**: The `layout.js` files within the `dashboard/` subdirectories use the `verifyRole()` utility to strictly enforce Role-Based Access Control (RBAC).

## State and Session Management

- **Authentication**: Managed via `better-auth`.
  - Server-side: `auth.api.getSession()` and `getUserToken()`.
  - Client-side: `authClient.useSession()` and `authClient.token()`.
- **Global UI State**: Minimal global state. Relies on URL search params (e.g., for filtering properties) and React's local state.

## Tracking Provider

The `TrackingProvider.jsx` is mounted globally (via `AppLayoutWrapper.jsx`). It orchestrates the real-time activity monitoring by firing route-change events and heartbeat pings to the backend.
