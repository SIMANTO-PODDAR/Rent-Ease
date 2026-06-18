import { Calendar, Mail, Star } from 'lucide-react';
import React from 'react';

const PropertyReviews = async ({ propertyId }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-reviews/${propertyId}`);
    const reviews = await res.json();

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-6 flex items-center gap-2">
                Guest Reviews
                <span className="text-sm font-normal text-gray-400">({reviews.length})</span>
            </h3>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white rounded-lg border border-gray-100 p-4 mb-4 last:mb-0 shadow-sm hover:shadow-md transition-shadow">

                        <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                                <h4 className="font-semibold text-gray-800 text-base">
                                    {review.tenantInfo.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1">
                                        <span className='scale-70'><Mail/></span> {review.tenantInfo.email || 'N/A'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className='scale-70'><Calendar/></span> {review.date}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400 mt-0.5">
                                    Rating: {review.rating}/5
                                </span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="mt-2 pt-2 border-t border-gray-50">
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyReviews;