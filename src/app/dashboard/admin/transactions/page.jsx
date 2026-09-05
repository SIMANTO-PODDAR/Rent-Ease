import Pagination from '@/components/Pagination';
import getUserToken from '@/lib/getUserToken';
import { Table } from '@heroui/react';

const TransactionsPage = async ({ searchParams }) => {
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
        itemLabel: 'transactions'
    };

    return (
        <div className="mt-10 max-w-5xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    Transactions Overview
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    Get a complete overview of all platform transactions.
                </p>
            </div>

            <Table className="min-w-75 max-w-230 mx-auto mt-4">
                <Table.ScrollContainer >
                    <Table.Content aria-label="Team members">
                        <Table.Header>
                            <Table.Column isRowHeader>#</Table.Column>
                            <Table.Column>Transaction ID</Table.Column>
                            <Table.Column>Property Name</Table.Column>
                            <Table.Column>Tenant Name</Table.Column>
                            <Table.Column>Owner Name</Table.Column>
                            <Table.Column>Amount $</Table.Column>
                            <Table.Column>Date</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {bookingData.map((data, ind) =>
                                < Table.Row key={ind}>
                                    <Table.Cell>{(page - 1) * limit + ind + 1}</Table.Cell>

                                    {/* Transaction ID */}
                                    <Table.Cell>
                                        <p className="font-bold">
                                            {data.transactionId || 'N/A'}
                                        </p>
                                    </Table.Cell>

                                    {/* Property Name */}
                                    <Table.Cell>
                                        {data.propertyName}
                                    </Table.Cell>

                                    {/* Tenant Name */}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {data.tenantName}
                                    </Table.Cell>

                                    {/* Owner Name*/}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {data.ownerName}
                                    </Table.Cell>

                                    {/* Amount */}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {data.amountPaid}
                                    </Table.Cell>

                                    {/* Booking Date*/}
                                    <Table.Cell className='text-[10px] lg:text-sm'>
                                        {new Date(data.bookingDate).toLocaleDateString()}
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

export default TransactionsPage;
