import React from 'react';
import Link from 'next/link';
import { MapPin, Bed, Square, User, Mail, ArrowLeft } from 'lucide-react';
import PropertyActions from '@/components/PropertyActions';
import PropertyReviews from '@/components/PropertyReviews';

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${id}`);
        const property = await res.json();
        return {
            title: `${property.title || 'Property Details'} - Rent Ease`,
            description: property.description || 'View details of this rental property on Rent Ease.',
        };
    } catch (e) {
        return {
            title: 'Property Details - Rent Ease',
            description: 'View details of this rental property on Rent Ease.',
        };
    }
}

const PropertyDetailsPage = async ({ params }) => {
    const { id } = await params;

    let property = null;
    let error = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${id}`, {
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Failed to fetch property details.');
        }
        property = await res.json();
    } catch (err) {
        error = err.message;
    }

    if (error || !property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h2>
                    <p className="text-gray-500 mb-6">We couldn&apos;t retrieve details for this property. It may have been removed or is temporarily unavailable.</p>
                    <Link href="/all-properties" className="inline-flex items-center gap-2 bg-[#0a3d62] text-white py-2.5 px-5 rounded-xl font-semibold hover:opacity-90 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Properties
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/all-properties" className="inline-flex items-center gap-2 text-[#0a3d62] font-semibold hover:text-[#3498db] transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Properties</span>
                    </Link>
                </div>

                {/* 1. Large Property Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-xl h-64 sm:h-100 md:h-120 mb-8 bg-gray-200">
                    <img
                        src={property.image || '/placeholder-property.jpg'}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    {property.status && (
                        <div className={`absolute top-4 left-4 backdrop-blur-md px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg ${property.status === 'approved'
                            ? 'bg-emerald-500/90 text-white'
                            : 'bg-amber-500/90 text-white'
                            }`}>
                            {property.status}
                        </div>
                    )}
                </div>

                {/* 2. Property Information Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {property.propertyType && (
                            <span className="bg-[#3498db]/10 text-[#3498db] border border-[#3498db]/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                {property.propertyType}
                            </span>
                        )}
                        {property.rentType && (
                            <span className="bg-purple-50 text-purple-600 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                {property.rentType}
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0a3d62] mb-3 leading-tight">
                        {property.title}
                    </h1>

                    <div className="flex items-center text-gray-500 mb-6">
                        <MapPin className="w-5 h-5 text-[#3498db] mr-2 shrink-0" />
                        <span className="text-sm sm:text-base font-medium">{property.location}</span>
                    </div>

                    {/* Price and Key Specs Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-t border-b border-gray-100 mb-6">
                        <div>
                            <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Rent Price</span>
                            <div className="flex items-baseline">
                                <span className="text-2xl sm:text-3xl font-black text-[#0a3d62]">${property.rentPrice?.toLocaleString()}</span>
                                <span className="text-gray-500 text-sm font-medium ml-1">/ {property.rentType || 'month'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-3 rounded-2xl text-[#3498db]">
                                <Bed className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Bedrooms</span>
                                <span className="text-lg font-bold text-gray-800">{property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-3 rounded-2xl text-[#3498db]">
                                <Square className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">Property Size</span>
                                <span className="text-lg font-bold text-gray-800">{property.size?.toLocaleString()} sqft</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-bold text-[#0a3d62] mb-3">About This Property</h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                            {property.description}
                        </p>
                    </div>
                </div>

                {/* 3. Amenities Section */}
                {property.amenities && property.amenities.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-4">Amenities</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {property.amenities.map((amenity, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-50 text-gray-700 border border-gray-100 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-100/70 transition-colors"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]" />
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. Extra Features Section */}
                {property.extraFeatures && property.extraFeatures.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-4">Extra Features</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {property.extraFeatures.map((feature, idx) => (
                                <span
                                    key={idx}
                                    className="border-2 border-dashed border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-50/50 transition-colors"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. Owner Information Section */}
                {property.owner && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-4">Owner Information</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/50 border border-gray-100 p-6 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-linear-to-r from-[#0a3d62] to-[#3498db] text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-md uppercase">
                                    {property.owner.name ? property.owner.name.substring(0, 2) : 'OW'}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        {property.owner.name || 'N/A'}
                                    </h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        {property.owner.email || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 6. Action Buttons Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-2">Actions</h3>
                    <p className="text-xs text-gray-400 mb-4">Select an option below for Booking and favorites.</p>
                    <PropertyActions propertyId={id} />
                </div>

                {/* 7. Reviews Section */}
                <PropertyReviews propertyId={id} />

            </div>
        </div>
    );
};

export default PropertyDetailsPage;