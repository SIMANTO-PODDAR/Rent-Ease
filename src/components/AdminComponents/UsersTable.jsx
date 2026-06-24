'use client'
import { Button, Table } from '@heroui/react';
import toast from 'react-hot-toast';

const UsersTable = ({ UsersData }) => {

    const setTenant = async (userId) => {
        const LoadingToast = toast.loading('Processing your request...');

        const userRole = {
            role: "Tenant",
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-user/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },

                    body: JSON.stringify(userRole)
                });

            if (res.ok == true) {
                toast.success('Role updated successfully!', {
                    id: LoadingToast
                });
                window.location.reload();
            }

            else {
                toast.error('Something went wrong! Try again.', {
                    id: LoadingToast
                });
            };
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                id: LoadingToast
            });
        }
    }

    const setOwner = async (userId) => {
        const LoadingToast = toast.loading('Processing your request...');

        const userRole = {
            role: "Owner",
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-user/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },

                    body: JSON.stringify(userRole)
                });

            if (res.ok == true) {
                toast.success('Role updated successfully!', {
                    id: LoadingToast
                });
                window.location.reload();
            }

            else {
                toast.error('Something went wrong! Try again.', {
                    id: LoadingToast
                });
            };
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                id: LoadingToast
            });
        }
    }

    return (
        <Table className="min-w-75 max-w-250 mx-auto mt-4">
            <Table.ScrollContainer >
                <Table.Content aria-label="Team members">
                    <Table.Header>
                        <Table.Column>#</Table.Column>

                        <Table.Column isRowHeader>Name & Email</Table.Column>
                        <Table.Column >Current Role</Table.Column>

                        <Table.Column >Update Role</Table.Column>
                    </Table.Header>


                    <Table.Body>
                        {UsersData.map((data, ind) =>
                            < Table.Row key={ind}>
                                <Table.Cell>{ind + 1}</Table.Cell>

                                {/* Name*/}
                                <Table.Cell>
                                    Name: {data.name} <br />
                                    Email: {data.email}
                                </Table.Cell>

                                {/* Role */}
                                <Table.Cell>
                                    Current Role: {data.role}
                                </Table.Cell>

                                {/* Update Role*/}
                                <Table.Cell >

                                    {data.role == "Tenant" &&
                                        <Button
                                            onClick={() => { setOwner(data._id) }} >
                                            Owner
                                        </Button>
                                    }

                                    {data.role == "Owner" &&
                                        <Button
                                            onClick={() => { setTenant(data._id) }} >
                                            Tenant
                                        </Button>
                                    }

                                    {data.role == "Admin" && <Button isDisabled >Admin</Button>}

                                </Table.Cell>
                            </ Table.Row>
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table >
    );
};

export default UsersTable;