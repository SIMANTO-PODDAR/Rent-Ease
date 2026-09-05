import Pagination from '@/components/Pagination';
import getUserToken from '@/lib/getUserToken';
import { Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const AllBookingsPage = async ({ searchParams }) => {
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;

    const userToken = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings?page=${page}&limit=${limit}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`   // verifyUserToken
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
        <div className="mt-10 mx-auto px-4 max-w-5xl">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    All Bookings
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    Monitor all property bookings.
                </p>
            </div>


            <Table className="min-w-75 max-w-230 mx-auto mt-4">
                <Table.ScrollContainer >
                    <Table.Content aria-label="Team members">
                        <Table.Header>
                            <Table.Column isRowHeader>#</Table.Column>
                            <Table.Column>Property Info</Table.Column>
                            <Table.Column>Owner Info (name,email)</Table.Column>
                            <Table.Column>Tenant Info (name,email,number)</Table.Column>
                            <Table.Column>Booking Info</Table.Column>
                        </Table.Header>


                        <Table.Body>
                            {bookingData.map((data, ind) =>
                                < Table.Row key={ind}>
                                    <Table.Cell>{(page - 1) * limit + ind + 1}</Table.Cell>

                                    {/* Property Info */}
                                    <Table.Cell>
                                        <Link className="hover:underline hover:cursor-pointer hover:text-[#0d95f0] font-bold" href={`/all-properties/${data.propertyId}`}>{data.propertyName}</Link> <br />
                                        {`Price: ${data.amountPaid}$`}
                                    </Table.Cell>

                                    {/* Owner Info */}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {data.ownerName} <br />
                                        {data.ownerEmail}
                                    </Table.Cell>

                                    {/* Tenant Info */}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {data.tenantName} <br />
                                        {data.tenantEmail} <br />
                                        {data.contactNumber}
                                    </Table.Cell>

                                    {/* Booking Info */}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {`Booking Status: ${data.bookingStatus}`}<br />
                                        {`Booking Date: ${new Date(data.bookingDate).toLocaleDateString()}`}<br />
                                        {`Payment Status: ${data.paymentStatus}`}
                                    </Table.Cell>
                                </ Table.Row>
                            )}

                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table >

            <Pagination pagination={paginationData} />
        </div>
    );
};

export default AllBookingsPage;