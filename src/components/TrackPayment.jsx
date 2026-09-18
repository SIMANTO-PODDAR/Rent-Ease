"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export default function TrackPayment({ bookingId, transactionId }) {
    useEffect(() => {
        trackEvent("PAYMENT_COMPLETED", { bookingId, transactionId });
    }, [bookingId, transactionId]);

    return null;
}
