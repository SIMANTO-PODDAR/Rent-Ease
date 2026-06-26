# Rent-Ease

**Live URL:** [https://rent-ease.vercel.app](https://rent-ease-gold.vercel.app)

## Purpose

Rent-Ease is a modern, comprehensive property rental and booking platform designed to seamlessly connect tenants and property owners. The application provides an intuitive and visually appealing interface allowing users to discover high-quality rental properties, save their favorites for future reference, and book properties entirely online. With secure payment processing built-in, users can safely manage transactions. Rent-Ease also features comprehensive role-based dashboards, giving tenants control over their bookings and favorites, while providing property owners and administrators with powerful tools to manage properties, booking requests, earnings analytics, and user interactions.

## Key Features

- **Advanced Search & Filtering:** Find rental properties easily with robust search and filtering capabilities.
- **Favorites Management:** Save favorite properties to your profile for later consideration.
- **Seamless Online Booking:** Book properties online with a straightforward, user-friendly booking flow.
- **Secure Payments:** Secure Stripe payment integration for trustworthy and safe financial transactions.
- **Tenant Dashboard:** Dedicated portal for tenants to easily manage active bookings and view saved favorites.
- **Owner Dashboard:** Comprehensive toolkit for property management, handling booking requests, and viewing earnings analytics.
- **Admin Dashboard:** Centralized control center for managing users, overseeing all properties, moderating bookings, and tracking transactions.
- **Role-Based Authentication:** Secure system with protected routes ensuring users only access information appropriate to their role (Tenant, Owner, Admin).
- **Responsive Design:** Fully responsive UI providing an optimal experience across mobile, tablet, and desktop devices.
- **Modern UI/UX:** Engaging user interface featuring interactive charts and smooth, modern UI animations.

## Tech Stack & npm Packages

The project utilizes a modern Next.js ecosystem, categorized by their purpose below:

### Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `16.2.9` | React framework for production (App Router) |
| `react` / `react-dom` | `19.2.4` | Core UI library |
| `better-auth` | `^1.6.19` | Complete authentication solution |
| `@better-auth/mongo-adapter` | `^1.6.19` | MongoDB adapter for better-auth |
| `mongodb` | `^7.3.0` | Official MongoDB database driver |
| `stripe` | `^22.2.1` | Stripe Node.js library for backend payment processing |
| `@stripe/stripe-js` | `^9.8.0` | Stripe.js for frontend checkout and elements |
| `@heroui/react` | `^3.2.1` | Modern React UI component library |
| `motion` | `^12.40.0` | Production-ready animation library |
| `recharts` | `^3.8.1` | Composable charting library for React |
| `lucide-react` | `^1.20.0` | Beautiful and consistent icon set |
| `react-icons` | `^5.6.0` | Additional popular icons |
| `react-fast-marquee` | `^1.6.5` | React component for smooth marquees |
| `react-hot-toast` | `^2.6.0` | Smoking hot React notifications |

### Dev Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `tailwindcss` | `^4` | Utility-first CSS framework |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for Tailwind CSS |
| `daisyui` | `^5.5.23` | Tailwind CSS component library |
| `@gravity-ui/icons` | `^2.18.0` | Additional SVG icons for UI |
| `eslint` | `^9` | Pluggable linting utility |
| `eslint-config-next` | `16.2.9` | ESLint configuration for Next.js |
| `babel-plugin-react-compiler` | `1.0.0` | React compiler optimization |

## Installation & Setup

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/SIMANTO-PODDAR/rent-ease.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd rent-ease
   ```

3. **Install NPM packages**

   ```bash
   npm install
   ```

4. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the necessary configuration. See the Environment Variables section below.

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open the app**
   Navigate to `http://localhost:3000` in your browser.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. Do not expose your actual secret keys.

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Other necessary variables as needed by the application
```

## Future Improvements

While Rent-Ease provides a robust foundation, several enhancements are planned for the future:

- **In-App Messaging:** Allow direct communication between tenants and property owners within the platform.
- **Reviews & Ratings:** Implement a system for tenants to rate properties and leave reviews after their stay.
- **Virtual Tours:** Integrate 3D virtual tours or video walkthroughs for properties.
- **Multi-language Support:** Internationalize the application to support a wider global audience.
- **Advanced Analytics:** Deeper insights and reporting for property owners regarding viewer demographics and seasonal trends.

## Conclusion

Rent-Ease aims to streamline the property rental process for everyone involved. By combining a modern technology stack with a focus on user experience and robust functionality, it serves as a powerful tool for discovering, booking, and managing real estate efficiently. We hope you find this platform valuable!
