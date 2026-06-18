import PropertyCard from '@/components/PropertyCard';
import React from 'react';

const FeaturedProperties = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/featured-properties`, { cache: "no-store" });
    const fProperties = await res.json();

    return (
        <div>
            <div className="text-center mt-5 mb-12">
                <div>
                    <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                        Featured Properties
                    </h2>
                </div>
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

export default FeaturedProperties;