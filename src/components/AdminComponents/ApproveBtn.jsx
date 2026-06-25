'use client'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';

const ApproveBtn = ({ PropertyId }) => {

    const Approve = async (PropertyId) => {
        const LoadingToast = toast.loading('Processing your request...');
        const propertyData = {
            status: "Approved",
            rejectionFeedback: "",
        };

        const { data: tokenData } = await authClient.token();
        const userToken = tokenData?.token;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${PropertyId}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${userToken}`    // verifyUserToken
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
        <Button variant="secondary" size='sm' className=" text-[#3498db] font-bold"
            onClick={() => { Approve(PropertyId) }}
        >
            Approve
        </Button>
    );
};

export default ApproveBtn;