"use client";
import React from 'react';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from "motion/react";
const PropertyCard = ({ property }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                    <img
                        src={property.image || '/placeholder-property.jpg'}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-[#0a3d62] text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                        ${property.rentPrice?.toLocaleString()}<span className="text-sm font-normal">/month</span>
                    </div>

                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-lg">
                        <Heart className="w-5 h-5 text-[#0a3d62] hover:text-red-500 transition-colors" />
                    </button>

                    <div className="absolute bottom-4 left-4 bg-[#3498db]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {property.propertyType || 'Property'}
                    </div>

                    {property.status !== 'approved' && (
                        <div className="absolute bottom-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                            {property.status}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">

                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-[#0D0D33] mb-2 line-clamp-1 hover:text-[#3498db] transition-colors">
                            {property.title}
                        </h3>
                        <div className="flex items-center text-gray-500">
                            <MapPin className="w-4 h-4 mr-1 text-[#3498db] shrink-0" />
                            <p className="text-sm line-clamp-1">{property.location}</p>
                        </div>
                    </div>


                    <div className="flex justify-between items-center py-3 border-t border-b border-gray-100 mb-4">
                        <div className="flex items-center space-x-1">
                            <Bed className="w-4 h-4 text-[#3498db]" />
                            <span className="text-sm font-medium text-gray-700">
                                {property.bedrooms} {property.bedrooms > 1 ? 'Beds' : 'Bed'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Bath className="w-4 h-4 text-[#3498db]" />
                            <span className="text-sm font-medium text-gray-700">
                                {Math.floor(property.bedrooms / 2) || 1} {Math.floor(property.bedrooms / 2) > 1 ? 'Baths' : 'Bath'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Square className="w-4 h-4 text-[#3498db]" />
                            <span className="text-sm font-medium text-gray-700">
                                {property.size?.toLocaleString()} sqft
                            </span>
                        </div>
                    </div>

                    <Link href={`/all-properties/${property._id}`}>
                        <button className="w-full bg-linear-to-r from-[#0a3d62] to-[#3498db] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#0a3d62] hover:to-[#2980b9] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>

    );
};

export default PropertyCard;