import { Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const AllBookingsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings`);
    const bookingData = await res.json();

    return (
        <div className="mt-10 mx-auto px-4">
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
                                    <Table.Cell>{ind + 1}</Table.Cell>

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
        </div>
    );
};

export default AllBookingsPage;