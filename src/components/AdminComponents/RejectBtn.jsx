'use client'
import { Button, FieldError, Label, Modal, Surface, TextArea, TextField } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';

const RejectBtn = ({ PropertyId }) => {

    const UpdateInfo = async (event) => {
        const LoadingToast = toast.loading('Processing your request...');
        event.preventDefault();

        const rejectionFeedback = event.target.rejectionFeedback.value;

        const propertyData = {
            status: "Rejected",
            rejectionFeedback: rejectionFeedback
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${PropertyId}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },

                    body: JSON.stringify(propertyData)
                });

            if (res.ok == true) {
                toast.success('Property status updated successfully!', {
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
        <div>

            <Modal>
                <Button variant="danger-soft" size='sm' className="font-bold">
                    Reject
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl mt-50">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Rejection Feedback</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <Surface variant="default">
                                    <form onSubmit={UpdateInfo}
                                        className="p-5 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Rejection Feedback */}
                                            <div className="md:col-span-2">
                                                <TextField
                                                    name="rejectionFeedback"
                                                    isRequired>
                                                    <Label>Feedback</Label>
                                                    <TextArea
                                                        maxLength={250}
                                                        placeholder="Write feedback about the rejection..."
                                                        className="rounded-3xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>
                                        </div>

                                        <Modal.Footer>
                                            <Button type="submit" variant="danger-soft" className="font-bold" >
                                                Reject
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default RejectBtn;