'use client'
import { Button } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';

const RejectBtn = ({ PropertyId }) => {

    const Reject = (PropertyId) => {
        toast(PropertyId)
    }

    return (
        <Button variant="danger-soft" className="font-bold"
            onClick={() => { Reject(PropertyId) }}
        >
            Reject
        </Button>
    );
};

export default RejectBtn;