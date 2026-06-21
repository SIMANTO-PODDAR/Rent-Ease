import OwnerPageHead from '@/components/OwnerComponents/OwnerPageHead';
import SummaryCards from '@/components/OwnerComponents/SummaryCards';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const OwnerDashboardHome = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const ownerId = await session?.user?.id;

    // Booking
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-bookings/${ownerId}`);
    const bookingData = await res.json();

    const TotalBookings = bookingData.filter(
        item => item.bookingStatus == "Approved"
    ).length;
    const TotalEarnings = bookingData.filter(item => item.paymentStatus == "Paid").reduce((sum, item) => sum + item.amountPaid, 0);


    //Property
    const propertiesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-properties/${ownerId}`);
    const PropertiesData = await propertiesRes.json();

    const TotalProperties = PropertiesData.length;



    return (
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <OwnerPageHead />
            <SummaryCards TotalEarnings={TotalEarnings} TotalProperties={TotalProperties} TotalBookings={TotalBookings} />

        </div>
    );
};

export default OwnerDashboardHome;