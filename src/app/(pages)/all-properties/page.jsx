import PropertyCard from '@/components/PropertyCard';
import React from 'react';

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties`, { cache: "no-store" });
    const fProperties = await res.json();
    return (
        <div>
            <div className="text-center mt-5 mb-12">
                <h2 className="text-4xl text-[#0D0D33] md:text-5xl font-bold my-10">
                    All Properties
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 justify-center gap-10">
                    {
                        fProperties.map((property, ind) =>
                            <PropertyCard key={ind} property={property} />)

                    }
                </div>
            </div>
        </div>
    );
};

export default page;