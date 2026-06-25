"use client"
import { authClient } from '@/lib/auth-client';
import { AlertDialog, Button } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';
import { FcDeleteDatabase } from 'react-icons/fc';
import { MdDeleteForever } from 'react-icons/md';

const PropertyDeleteBtn = ({ propertyId, propertyName }) => {

    const deleteProperty = async (propertyId) => {
        const LoadingToast = toast.loading('Processing your request...');

        const { data: tokenData } = await authClient.token();
        const userToken = tokenData?.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${propertyId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${userToken}`    // verifyUserToken
            }
        })

        if (res.ok == true) {
            toast.success('Property deleted successfully!', {
                id: LoadingToast
            });
            window.location.reload();
        }
        else {
            toast.error('Something went wrong! Try again.', {
                id: LoadingToast
            });
        };
    };

    return (


        <div>
            <AlertDialog>
                <Button variant="danger-soft" className="font-bold" size='sm'>
                    Delete<MdDeleteForever />
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <FcDeleteDatabase className="text-3xl" />

                                <AlertDialog.Heading>
                                    <p className="text-error font-bold">Delete This Property?</p>
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>
                                    This action is permanent and cannot be undone.
                                </p>
                                <span className='font-bold text-xl'>
                                    Name: {propertyName}
                                </span>

                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>

                                {/* DELETE */}
                                <Button onClick={() => deleteProperty(propertyId)} slot="close" variant="danger">
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default PropertyDeleteBtn;