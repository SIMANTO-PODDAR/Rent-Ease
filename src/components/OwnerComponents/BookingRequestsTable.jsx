'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';

const BookingRequestsTable = ({ bookingData }) => {

    const ApproveBooking = async (bookingId) => {
        const LoadingToast = toast.loading('Processing your request...');
        const Data = {
            bookingStatus: 'Approved',
        };

        const { data: tokenData } = await authClient.token();
        const userToken = tokenData?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings/${bookingId}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${userToken}`    // verifyUserToken
                },

                body: JSON.stringify(Data)
            });

        if (res.ok == true) {
            toast.success('Booking Status updated successfully!', {
                id: LoadingToast
            });
            window.location.reload();
        }

        else {
            toast.error('Something went wrong! Try again.', {
                id: LoadingToast
            });
        };
    }

    const RejectBooking = async (bookingId) => {
        const LoadingToast = toast.loading('Processing your request...');
        const Data = {
            bookingStatus: 'Rejected',
        };

        const { data: tokenData } = await authClient.token();
        const userToken = tokenData?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings/${bookingId}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${userToken}`    // verifyUserToken
                },

                body: JSON.stringify(Data)
            });

        if (res.ok == true) {
            toast.success('Booking Status updated successfully!', {
                id: LoadingToast
            });
            window.location.reload();
        }

        else {
            toast.error('Something went wrong! Try again.', {
                id: LoadingToast
            });
        };
    }


    return (
        <Table className="min-w-75 max-w-200 mx-auto mt-4">
            <Table.ScrollContainer >
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column isRowHeader>Property</Table.Column>
                        <Table.Column>Tenant Info</Table.Column>
                        <Table.Column>Booking Amount</Table.Column>
                        <Table.Column>Approve</Table.Column>
                        <Table.Column>Reject</Table.Column>
                    </Table.Header>


                    <Table.Body>
                        {bookingData.map((data, ind) =>
                            < Table.Row key={ind}>
                                <Table.Cell>{ind + 1}</Table.Cell>

                                {/* Property */}
                                <Table.Cell className='text-[10px] lg:text-sm'>
                                    <Link className="hover:underline hover:cursor-pointer hover:text-[#0d95f0] font-bold" href={`/all-properties/${data.propertyId}`}>{data.propertyName}</Link> <br />
                                    Booking-Status:{data.bookingStatus}
                                </Table.Cell>

                                {/* Tenant Info */}
                                <Table.Cell className='text-[10px] lg:text-sm'>
                                    Name:{data.tenantName} <br />
                                    Email:{data.tenantEmail} <br />
                                    Number:{data.contactNumber}
                                </Table.Cell>

                                {/* Booking Amount */}
                                <Table.Cell className='text-[10px] lg:text-sm'>
                                    {data.amountPaid} $<br />
                                    <span className='font-bold'>{data.paymentStatus}</span>
                                </Table.Cell>

                                {/* Approve  */}
                                <Table.Cell>
                                    <Button
                                        onClick={() => ApproveBooking(data._id)}
                                        size='sm'
                                    >
                                        Approve
                                    </Button>
                                </Table.Cell>

                                {/* Reject  */}
                                <Table.Cell>
                                    <Button variant="danger-soft"
                                        onClick={() => RejectBooking(data._id)}
                                        size='sm'
                                    >
                                        Reject
                                    </Button>
                                </Table.Cell>
                            </ Table.Row>
                        )}

                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
};

export default BookingRequestsTable;