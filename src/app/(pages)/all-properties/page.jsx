import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import React from 'react';

const page = async ({ searchParams }) => {

    const resolvedParams = await searchParams;
    const search = resolvedParams?.search || '';
    const propertyType = resolvedParams?.propertyType || '';
    const sort = resolvedParams?.sort || '';
    const pageParam = parseInt(resolvedParams?.page) || 1;
    const limitParam = parseInt(resolvedParams?.limit) || 9;

    //  querys
    const queryParams = new URLSearchParams();
    if (search) queryParams.set('search', search);
    if (propertyType && propertyType !== 'All Types') queryParams.set('propertyType', propertyType);
    if (sort) queryParams.set('sort', sort);
    queryParams.set('page', pageParam.toString());
    queryParams.set('limit', limitParam.toString());

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/all-properties?${queryParams.toString()}`,
        { cache: "no-store" }
    );
    const data = await res.json();
    const fProperties = data.properties || [];
    const pagination = data.pagination || { currentPage: 1, totalPages: 1, totalItems: 0, limit: 9 };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div>
                    <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                        All Properties
                    </h2>
                    <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                        Browse all available approved properties. Use the search and filters below to narrow down your choices.
                    </p>
                </div>

                <PropertyFilter
                    initialSearch={search}
                    initialPropertyType={propertyType}
                    initialSort={sort}
                />

                {fProperties && fProperties.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mt-6">
                            {fProperties.map((property, ind) => (
                                <PropertyCard key={property._id || ind} property={property} />
                            ))}
                        </div>
                        <Pagination pagination={pagination} />
                    </>
                ) : (
                    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 shadow-md max-w-md mx-auto mt-12 flex flex-col items-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">No Properties Found</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            We couldn&apos;t find any approved properties matching your search criteria. Try adjusting or clearing your filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;