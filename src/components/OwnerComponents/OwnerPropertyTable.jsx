"use client"

import { AlertDialog, Button, Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { GrDocumentUpdate } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';

const OwnerPropertyTable = ({ PropertyData }) => {

    const UpdateProperty = (id) => {
        toast(id)
    }

    const DeleteProperty = (id) => {
        toast(id)
    }

    return (
        <Table className="min-w-75 max-w-200 mx-auto mt-4">
            <Table.ScrollContainer >
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column isRowHeader>Property Name</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Update</Table.Column>
                        <Table.Column>Delete</Table.Column>
                    </Table.Header>


                    <Table.Body>
                        {PropertyData.map((data, ind) =>
                            < Table.Row key={ind}>
                                <Table.Cell>{ind + 1}</Table.Cell>
                                <Table.Cell>
                                    <Link className="hover:underline hover:cursor-pointer hover:text-[#0d95f0] font-bold" href={`/all-properties/${data._id}`}>{data.title}</Link>
                                </Table.Cell>

                                {/* Status */}
                                <Table.Cell className='align-middle'>
                                    {
                                        data.status != "Rejected" ? (data.status) :
                                            (<RejectionFeedbackDialog rejectionFeedback={data?.rejectionFeedback} />)
                                    }
                                </Table.Cell>

                                {/* Update */}
                                <Table.Cell onClick={() => UpdateProperty(data._id)}>
                                    <span className="flex items-center gap-1 hover:cursor-pointer hover:text-[#0d95f0] font-bold">Update<GrDocumentUpdate /></span>
                                </Table.Cell>

                                {/* Delete */}
                                <Table.Cell onClick={() => DeleteProperty(data._id)}>
                                    <span className="flex items-center gap-1 hover:cursor-pointer hover:text-danger font-bold">Delete<MdDeleteForever /></span>
                                </Table.Cell>
                            </ Table.Row>
                        )}

                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
};

export default OwnerPropertyTable;


const RejectionFeedbackDialog = ({ rejectionFeedback }) => {
    return (
        <div>
            <div>
                <AlertDialog>

                    <Button variant="ghost">
                        Rejected <FaEye />
                    </Button>

                    <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-100">
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                    <AlertDialog.Heading>
                                        <p className="text-error font-bold"> Rejection Feedback.</p>
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                    {
                                        rejectionFeedback
                                    }
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                        Close
                                    </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>
            </div>
        </div>
    )
};