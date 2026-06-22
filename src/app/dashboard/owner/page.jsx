import MonthlyEarningsChart from '@/components/OwnerComponents/MonthlyEarningsChart';
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

    // Property
    const propertiesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-properties/${ownerId}`);
    const PropertiesData = await propertiesRes.json();

    const TotalProperties = PropertiesData.length;

    // Booking
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-bookings/${ownerId}`);
    const bookingData = await res.json();

    const TotalBookings = bookingData.filter(
        item => item.bookingStatus == "Approved"
    ).length;
    const TotalEarnings = bookingData.filter(item => item.paymentStatus == "Paid").reduce((sum, item) => sum + item.amountPaid, 0);

    // Monthly Bookings Data
    const monthlyData = [];

    const today = new Date();

    // func to get Last 12 months
    for (let i = 11; i >= 0; i--) {
        const date = new Date(
            today.getFullYear(),
            today.getMonth() - i,
            1
        );

        monthlyData.push({
            name: date.toLocaleString("en-US", {
                month: "short",
            }),
            year: date.getFullYear(),
            revenue: 0,
            bookings: 0,
        });
    }

    bookingData.forEach((item) => {
        const bookingDate = new Date(item.bookingDate);

        const index = monthlyData.findIndex(
            (month) =>
                month.year === bookingDate.getFullYear() &&
                month.name ===
                bookingDate.toLocaleString("en-US", {
                    month: "short",
                })
        );

        if (index !== -1) {
            monthlyData[index].bookings += 1;

            if (item.paymentStatus === "Paid") {
                monthlyData[index].revenue += item.amountPaid;
            }
        }
    });


    return (
        <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

            {/* Section Header */}
            <OwnerPageHead />

            {/* 3 summary cards */}
            <SummaryCards
                TotalEarnings={TotalEarnings}
                TotalProperties={TotalProperties}
                TotalBookings={TotalBookings}
            />

            {/* Monthly Earnings Chart */}
            <MonthlyEarningsChart data={monthlyData} />

        </div>
    );
};

export default OwnerDashboardHome;