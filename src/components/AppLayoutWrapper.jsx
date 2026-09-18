"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingProvider from "@/components/TrackingProvider";

const AUTH_ROUTES = ["/authentication", "/auth"];

export default function AppLayoutWrapper({ children }) {
  const pathname = usePathname();

  // Check
  const isAuthRoute = Boolean(
    pathname &&
    AUTH_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  );

  // Authentication pages 
  if (isAuthRoute) {
    return <TrackingProvider>{children}</TrackingProvider>;
  }

  // Normal application pages 
  return (
    <TrackingProvider>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
      <Footer />
    </TrackingProvider>
  );
}
