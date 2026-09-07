"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    return <>{children}</>;
  }

  // Normal application pages 
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
