import { Table } from '@heroui/react';
import Link from 'next/link';
import PropertyUpdateBtn from '../Actions/PropertyUpdateBtn';
import PropertyDeleteBtn from '../Actions/PropertyDeleteBtn';
import ApproveBtn from './ApproveBtn';
import RejectBtn from './RejectBtn';

const AllPropertiesTable = ({ AllProperties }) => {
    return (
        <Table className="min-w-75 max-w-250 mx-auto mt-4">
            <Table.ScrollContainer >
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column isRowHeader>Property Name & Status</Table.Column>
                        <Table.Column className='text-center'>Update Status</Table.Column>
                        <Table.Column className='text-center'>Update</Table.Column>
                        <Table.Column className='text-center'>Delete</Table.Column>
                    </Table.Header>


                    <Table.Body>
                        {AllProperties.map((data, ind) =>
                            < Table.Row key={ind}>
                                <Table.Cell>{ind + 1}</Table.Cell>

                                <Table.Cell>
                                    <Link className="hover:underline hover:cursor-pointer hover:text-[#0d95f0] font-bold" href={`/all-properties/${data._id}`}>{data.title}</Link> <br />
                                    <span className='font-bold'>{`Status: ${data.status}`}</span>
                                </Table.Cell>

                                {/* Update Status Btns*/}
                                <Table.Cell className='flex'>
                                    <ApproveBtn PropertyId={data._id} />
                                    <RejectBtn PropertyId={data._id} />
                                </Table.Cell>

                                {/* Update */}
                                <Table.Cell>
                                    <PropertyUpdateBtn PropertyData={data} />
                                </Table.Cell>

                                {/* Delete */}
                                <Table.Cell>
                                    <PropertyDeleteBtn propertyId={data._id} propertyName={data.title} />
                                </Table.Cell>
                            </ Table.Row>
                        )}

                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
};

export default AllPropertiesTable;