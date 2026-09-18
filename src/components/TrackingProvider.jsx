"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { trackSessionUpdate } from "@/lib/tracking";

export default function TrackingProvider({ children }) {
  const pathname = usePathname();
  const entryPageRef = useRef(null);
  const sessionData = authClient.useSession(); // Re-trigger on auth state change

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    if (!entryPageRef.current) {
      entryPageRef.current = pathname;
    }

    const currentPage = pathname;
    const entryPage = entryPageRef.current;

    // Track immediately on route change or auth state change
    trackSessionUpdate(entryPage, currentPage);

    // Heartbeat every 1 minute
    const intervalId = setInterval(() => {
      trackSessionUpdate(entryPage, currentPage);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [pathname, sessionData?.data?.user?.id]); // Re-run when pathname or user ID changes

  return <>{children}</>;
}
