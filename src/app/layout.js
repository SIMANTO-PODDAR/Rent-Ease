import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppLayoutWrapper from "@/components/AppLayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rent Ease",
  description: "Rent-Ease is a modern, comprehensive property rental and booking platform designed to seamlessly connect tenants and property owners. The application provides an intuitive and visually appealing interface allowing users to discover high-quality rental properties, save their favorites for future reference, and book properties entirely online. With secure payment processing built-in, users can safely manage transactions. Rent-Ease also features comprehensive role-based dashboards, giving tenants control over their bookings and favorites, while providing property owners and administrators with powerful tools to manage properties, booking requests, earnings analytics, and user interactions",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}