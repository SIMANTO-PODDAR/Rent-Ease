import OwnerPropertyTable from '@/components/OwnerComponents/OwnerPropertyTable';
import Pagination from '@/components/Pagination';
import { auth } from '@/lib/auth';
import getUserToken from '@/lib/getUserToken';
import { headers } from 'next/headers';
import React from 'react';

const MyPropertiesPage = async ({ searchParams }) => {
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const ownerId = await session?.user?.id;

    const userToken = await getUserToken();

    // Property
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-properties/${ownerId}?page=${page}&limit=${limit}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`      // verifyUserToken
        },
        cache: 'no-store'
    });
    const data = await res.json();

    let PropertyData = [];
    let totalProperties = 0;
    let totalPages = 1;

    if (Array.isArray(data)) {
        totalProperties = data.length;
        totalPages = Math.ceil(totalProperties / limit) || 1;
        PropertyData = data.slice((page - 1) * limit, page * limit);
    } else {
        PropertyData = data.properties || [];
        totalProperties = data.totalProperties || 0;
        totalPages = data.totalPages || 1;
    }

    const paginationData = {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalProperties,
        limit: limit,
        itemLabel: 'properties'
    };

    return (
        <div className="mt-10 max-w-5xl mx-auto px-4">
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    My Properties
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    View, update, and monitor the status of your properties.
                </p>
            </div>

            <div>
                <OwnerPropertyTable PropertyData={PropertyData} currentPage={page} limit={limit} />
            </div>

            {
                totalProperties === 0 && (<h2 className="text-xl text-[#0a3d62] md:text-2xl font-bold mb-4 mt-4 text-center card m-3 w-80 mx-auto">
                    You haven&apos;t added any properties yet.
                </h2>)
            }

            <Pagination pagination={paginationData} />
        </div>
    );
};

export default MyPropertiesPage;