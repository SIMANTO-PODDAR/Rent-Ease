'use client'
import { Table } from "@heroui/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

export function FavoritesTable({ bookingData }) {
    const remove = (i) => {
        return toast(`Remove ${i}`)
    }

    return (
        <Table className="min-w-75 max-w-200 mx-auto mt-4">
            <Table.ScrollContainer >
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column isRowHeader>Property Name</Table.Column>
                        <Table.Column>Details</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>


                    <Table.Body>
                        {bookingData.map((data, ind) =>
                            < Table.Row key={ind}>
                                <Table.Cell>{ind + 1}</Table.Cell>
                                <Table.Cell>{data.propertyName}</Table.Cell>

                                <Table.Cell>
                                    <Link className="underline hover:cursor-pointer hover:text-[#0d95f0] font-bold flex" href={`/all-properties/${data.propertyId}`}>View</Link>
                                </Table.Cell>

                                <Table.Cell>
                                    <span onClick={() => { remove(data._id) }} className="flex items-center gap-1 hover:cursor-pointer hover:text-danger font-bold">Remove<MdDeleteForever /></span></Table.Cell>
                            </ Table.Row>
                        )}

                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
}