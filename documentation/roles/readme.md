# Rent-Ease — Role System Documentation

## Overview

Rent-Ease implements a **role-based access control (RBAC)** system with **three distinct roles**: `Tenant`, `Owner`, and `Admin`.

The role is stored as an additional field on each user in MongoDB via `better-auth`. Every dashboard section is protected server-side by the `verifyRole()` utility — any user whose role does not match the route they try to access is automatically signed out and shown a **403 Access Denied** page.

---

## How Roles Are Assigned

| Mechanism | Details |
| :--- | :--- |
| **Default role** | Every newly registered user is automatically assigned `"Tenant"` (`defaultValue: "Tenant"` in `auth.js`) |
| **Role promotion** | Only the **Admin** can change a user's role (Tenant ↔ Owner) via the User Management dashboard |
| **Admin role protection** | The Admin role cannot be changed through the UI — the role change button is permanently disabled for Admin accounts |
| **Authentication** | Supports email/password and Google OAuth; JWT session strategy with a 3-day max age |

---

## Route Protection — `verifyRole.js`

```
verifyRole(role):
  1. Reads current session from request headers (server-side)
  2. If no session found    → redirect to /authentication
  3. If role does not match → redirect to /unauthorized
  4. /unauthorized page auto-signs the user out (forced logout)
```

Every dashboard layout (`/dashboard/admin`, `/dashboard/owner`, `/dashboard/tenant`) calls `verifyRole()` server-side before rendering any child page, making route protection happen at the **layout level**.

---

## Role 1 — Tenant

### Identity & Assignment

- **Role string:** `"Tenant"`
- **Default role** — every new user starts as a Tenant
- **Dashboard route:** `/dashboard/tenant`

### Dashboard Sidebar Navigation

| Label | Route | Purpose |
| :--- | :--- | :--- |
| My Bookings | `/dashboard/tenant/my-bookings` | View all bookings and their payment status |
| Favorites | `/dashboard/tenant/my-favorites` | View and manage saved favorite properties |
| Profile | `/dashboard/tenant` | View personal profile information |

### What a Tenant Can Do

**Property Discovery**
- Browse all approved properties on the `/all-properties` public listing
- View individual property detail pages at `/all-properties/[id]`
- Use advanced search and filtering (available to all visitors)

**Booking**
- Book a property by filling out a booking form (move-in date, contact number, name, email, additional notes), then immediately redirected to Stripe for payment
- Booking is created with `bookingStatus: "Pending"` and `paymentStatus: "Unpaid"` by default
- View all their bookings in **My Bookings**, including booking status (Pending / Approved / Rejected) and payment status (Paid / Unpaid)

**Favorites**
- Add any property to Favorites from the property detail page
- Remove a property from Favorites
- View the full favorites list in **My Favorites**

**Reviews & Ratings**
- Submit a star rating (1–5) and a written review on any property detail page
- Reviews are linked to the tenant's identity (name, ID, email)

**Profile**
- View their own profile — name, email, role, email verification status, join date, last updated date

### Tenant Restrictions

- Cannot book a property unless signed in with role `Tenant` — attempting to book as Owner or Admin shows: *"Please sign in as a tenant to continue."*
- Cannot add to favorites or submit reviews unless signed in with role `Tenant`
- Cannot access `/dashboard/owner/*` or `/dashboard/admin/*` routes (redirected to 403)
- Cannot list, add, or manage properties
- Cannot approve or reject booking requests
- Cannot manage other users

---

## Role 2 — Owner

### Identity & Assignment

- **Role string:** `"Owner"`
- Promoted from Tenant by an Admin via the User Management panel
- **Dashboard route:** `/dashboard/owner`

### Dashboard Sidebar Navigation

| Label | Route | Purpose |
| :--- | :--- | :--- |
| Analytics | `/dashboard/owner` | Home dashboard with summary stats and earnings chart |
| Add Property | `/dashboard/owner/add-property` | Submit a new property listing |
| My Properties | `/dashboard/owner/my-properties` | View, update, and delete own properties |
| Booking Requests | `/dashboard/owner/booking-requests` | Approve or reject incoming booking requests |
| Profile | `/dashboard/owner/profile` | View personal profile information |

### What an Owner Can Do

**Analytics Dashboard**
- View three summary cards: **Total Properties**, **Total Approved Bookings**, **Total Earnings** (sum of all paid bookings)
- View a **Monthly Earnings Chart** showing revenue and booking count for the last 12 months

**Property Management**
- **Add a new property** — full form with: title, description, location, property type, rent price, rent type (Monthly / Weekly / Daily), bedrooms, bathrooms, size (sqft), amenities (Parking, Lift, CCTV, Gym, Balcony, etc.), extra features (Furnished, AC, Pet Friendly, Internet Ready, etc.), and a property image (uploaded via ImgBB, max 5MB)
- Newly submitted properties always start with `status: "Pending"` and require Admin approval before appearing publicly
- **View all own properties** — table showing property name and current status (Pending / Approved / Rejected)
- If a property is **Rejected**, the owner can view the rejection feedback written by the Admin
- **Update a property** — edit title, location, property type, rent price, rent type, size, bedrooms, bathrooms, and description. Updating resets the property status back to `"Pending"` for re-review
- **Delete a property**

**Booking Request Management**
- See all incoming booking requests for their properties, with tenant info (name, email, phone number), property name, booking status, amount, and payment status
- **Approve a booking** — sets `bookingStatus: "Approved"`
- **Reject a booking** — sets `bookingStatus: "Rejected"`

**Profile**
- View their own profile — name, email, role, email verification status, join date, last updated date

### Owner Restrictions

- Cannot access `/dashboard/tenant/*` or `/dashboard/admin/*` routes (redirected to 403)
- Properties are not publicly visible until an Admin approves them — newly submitted or updated properties stay at `"Pending"`
- Cannot manage or view other users
- Cannot view platform-wide bookings, transactions, or system analytics
- Booking request data is scoped to their own `ownerId` — cannot see or manage other Owners' bookings

---

## Role 3 — Admin

### Identity & Assignment

- **Role string:** `"Admin"`
- Cannot be set or revoked through the UI — the role update button is permanently disabled for Admin accounts
- **Dashboard route:** `/dashboard/admin`

### Dashboard Sidebar Navigation

| Label | Route | Purpose |
| :--- | :--- | :--- |
| Profile | `/dashboard/admin` | View admin profile |
| All Users | `/dashboard/admin/all-users` | Manage all registered users and their roles |
| Activity Monitor | `/dashboard/admin/activity-monitor` | Real-time visitor and session tracking |
| All Properties | `/dashboard/admin/all-properties` | Review, approve, reject, update, and delete any property |
| All Bookings | `/dashboard/admin/all-bookings` | View all bookings platform-wide |
| Transactions | `/dashboard/admin/transactions` | View all financial transactions platform-wide |

### What an Admin Can Do

**User Management** — `/dashboard/admin/all-users`
- View a paginated table of all registered users (name, email, current role)
- Change a user's role between Tenant and Owner:
  - Tenant → promote to Owner
  - Owner → demote to Tenant
- Admin accounts show a disabled button and cannot be modified

**Real-Time Activity Monitor** — `/dashboard/admin/activity-monitor`
- View live stats: active sessions, total visitors, device breakdown, geographic locations, and page navigation
- Search sessions by user/visitor, filter by role and active/inactive status, paginated (15 sessions per page)
- Drill into any individual session via a detail drawer
- Sessions expire after 30 minutes of inactivity

**Property Moderation** — `/dashboard/admin/all-properties`
- View all properties platform-wide, paginated
- See each property's name and current status (Pending / Approved / Rejected)
- **Approve a property** — sets `status: "Approved"`, clears rejection feedback, makes the property publicly visible
- **Reject a property** — opens a modal to write rejection feedback (max 250 characters), sets `status: "Rejected"` with the feedback (visible to the Owner)
- Toggle between Approved and Rejected as needed
- **Update any property's** details (same fields as Owner update)
- **Delete any property** from the platform

**All Bookings** — `/dashboard/admin/all-bookings`
- View a paginated table of all bookings across the entire platform
- Columns: property name & price, owner name & email, tenant name & email & contact number, booking status, booking date, payment status

**Transactions** — `/dashboard/admin/transactions`
- View a paginated transaction ledger for all bookings platform-wide
- Columns: transaction ID, property name, tenant name, owner name, amount paid ($), booking date

**Profile**
- View their own profile — name, email, role, email verification status, join date, last updated date

### Admin Restrictions & Notes

- The Admin role **cannot be revoked or assigned** through the UI — it is a fully protected role
- The Admin has no personal Favorites or Bookings section (those are Tenant-only features, enforced by role checks)
- Accessing `/dashboard/tenant/*` or `/dashboard/owner/*` as Admin results in a 403 redirect (strict role matching)

---

## Role Comparison Summary

| Capability | Tenant | Owner | Admin |
| :--- | :---: | :---: | :---: |
| Browse public property listings | ✅ | ✅ | ✅ |
| Book a property (with Stripe payment) | ✅ | ❌ | ❌ |
| Manage favorites (add / remove) | ✅ | ❌ | ❌ |
| Submit property reviews & ratings | ✅ | ❌ | ❌ |
| View own bookings | ✅ | ❌ | ❌ |
| Add a new property listing | ❌ | ✅ | ❌ |
| View & manage own properties | ❌ | ✅ | ❌ |
| Approve / reject incoming bookings | ❌ | ✅ | ❌ |
| View own earnings & analytics chart | ❌ | ✅ | ❌ |
| Approve / reject property listings | ❌ | ❌ | ✅ |
| Write rejection feedback for listings | ❌ | ❌ | ✅ |
| Update / delete properties | ❌ | Own only | ✅ All |
| View all platform-wide bookings | ❌ | ❌ | ✅ |
| View all platform-wide transactions | ❌ | ❌ | ✅ |
| Manage user roles (Tenant ↔ Owner) | ❌ | ❌ | ✅ |
| Real-time activity & session monitor | ❌ | ❌ | ✅ |
| View / update own profile | ✅ | ✅ | ✅ |

---

## Status Lifecycles

**Property Status**

```
Submit / Update  →  Pending  →  Approved  (by Admin)
                            →  Rejected  (by Admin, with written feedback)
```

**Booking Status**

```
Tenant Books  →  Pending  →  Approved  (by Owner)
                          →  Rejected  (by Owner)
```

**Payment Status**

```
Booking Created  →  Unpaid  →  Paid  (after successful Stripe checkout)
```

---

## Key Technical Reference

| Topic | Detail |
| :--- | :--- |
| Auth library | `better-auth` v1.6.19 with `@better-auth/mongo-adapter` |
| Session strategy | JWT, 3-day (`3 * 24 * 60 * 60` s) max age, cookie cache enabled |
| Role field location | Additional field on the `user` document in MongoDB |
| Default role | `"Tenant"` (set in `src/lib/auth.js`) |
| Route protection utility | `src/lib/verifyRole.js` — server-side, called in each dashboard layout |
| API authorization | Bearer JWT token passed in `authorization` header on all protected API calls |
| Supported auth methods | Email & Password, Google OAuth |
| Role values (exact strings) | `"Tenant"`, `"Owner"`, `"Admin"` (case-sensitive) |
