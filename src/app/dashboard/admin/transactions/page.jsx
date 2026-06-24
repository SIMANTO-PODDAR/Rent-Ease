import { Table } from '@heroui/react';

const TransactionsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings`);
    const bookingData = await res.json();

    return (
        <div className="mt-10 max-w-4xl mx-auto px-4">
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
                                    <Table.Cell>{ind + 1}</Table.Cell>

                                    {/* Transaction ID */}
                                    <Table.Cell>
                                        <p className="font-bold">
                                            {data.transactionId}
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
        </div>
    );
};

export default TransactionsPage;
