import OwnerPropertyTable from '@/components/OwnerComponents/OwnerPropertyTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyPropertiesPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const ownerId = await session?.user?.id;

    // Property
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/owner-properties/${ownerId}`);
    const PropertyData = await res.json();
    // console.log(PropertyData)

    return (
        <div className="mt-10">
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    My Properties
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    View, update, and monitor the status of your properties.
                </p>
            </div>

            <div>
                <OwnerPropertyTable PropertyData={PropertyData} />
            </div>

            {
                PropertyData.length == 0 && (<h2 className="text-xl text-[#0a3d62] md:text-2xl font-bold mb-4 mt-4 text-center card m-3 w-80 mx-auto">
                    You haven&apos;t added any properties yet.
                </h2>)
            }
        </div>
    );
};

export default MyPropertiesPage;