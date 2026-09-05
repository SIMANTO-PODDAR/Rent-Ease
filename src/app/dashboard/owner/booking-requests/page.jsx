import BookingRequestsTable from '@/components/OwnerComponents/BookingRequestsTable';
import Pagination from '@/components/Pagination';
import { auth } from '@/lib/auth';
import getUserToken from '@/lib/getUserToken';
import { headers } from 'next/headers';
import React from 'react';

const BookingRequestsPage = async ({ searchParams }) => {
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const ownerId = await session?.user?.id;

    const userToken = await getUserToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-bookings/${ownerId}?page=${page}&limit=${limit}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`      // verifyUserToken
        },
        cache: 'no-store'
    });
    const data = await res.json();

    let bookingData = [];
    let totalBookings = 0;
    let totalPages = 1;

    if (Array.isArray(data)) {
        totalBookings = data.length;
        totalPages = Math.ceil(totalBookings / limit) || 1;
        bookingData = data.slice((page - 1) * limit, page * limit);
    } else {
        bookingData = data.bookings || [];
        totalBookings = data.totalBookings || 0;
        totalPages = data.totalPages || 1;
    }

    const paginationData = {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalBookings,
        limit: limit,
        itemLabel: 'bookings'
    };

    return (
        <div className="mt-10 max-w-5xl mx-auto px-4">
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    My Property Booking Requests
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    Review and manage booking requests for your listed properties.
                </p>
            </div>

            <div>
                <BookingRequestsTable bookingData={bookingData} currentPage={page} limit={limit} />
            </div>

            {
                totalBookings === 0 && (<h2 className="text-xl text-[#0a3d62] md:text-2xl font-bold mb-4 mt-4 text-center card m-3 w-80 mx-auto">
                    No booking requests have been received yet.
                </h2>)
            }

            <Pagination pagination={paginationData} />
        </div>
    );
};

export default BookingRequestsPage;