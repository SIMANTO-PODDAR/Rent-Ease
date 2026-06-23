'use client'
import { Button } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';

const ApproveBtn = ({ PropertyId }) => {

    const Approve = (PropertyId) => {
        toast(PropertyId)
    }

    return (
        <Button variant="ghost" className="hover:text-[#3498db] font-bold"
            onClick={() => { Approve(PropertyId) }}
        >
            Approve
        </Button>
    );
};

export default ApproveBtn;