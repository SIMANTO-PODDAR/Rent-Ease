import { Table } from "@heroui/react";
import Link from "next/link";

export function BookingTable({ bookingData }) {
    return (
        <Table className="min-w-75 max-w-200 mx-auto mt-4">
            <Table.ScrollContainer >
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column isRowHeader>Property Name</Table.Column>
                        <Table.Column>Booking Date</Table.Column>
                        <Table.Column>Amount Paid $</Table.Column>
                        <Table.Column>Booking status</Table.Column>
                        <Table.Column>Payment status</Table.Column>
                    </Table.Header>


                    <Table.Body>
                        {bookingData.map((data, ind) =>
                            < Table.Row key={ind}>
                                <Table.Cell>
                                    <Link className="underline hover:cursor-pointer hover:text-[#0d95f0] font-bold" href={`/all-properties/${data.propertyId}`}>{data.propertyName}</Link>
                                </Table.Cell>
                                <Table.Cell>{new Date(data.bookingDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{data.amountPaid}</Table.Cell>
                                <Table.Cell>{data.bookingStatus}</Table.Cell>
                                <Table.Cell>{data.paymentStatus}</Table.Cell>
                            </ Table.Row>
                        )}

                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
}