import React from 'react';
import { Calendar, Mail, Star } from 'lucide-react';

const ReviewCard = ({ review, home }) => {
    return (
        <div className={`bg-white rounded-lg border border-gray-100 p-4 mb-4 last:mb-0 shadow-sm hover:shadow-md transition-shadow ${home && 'mx-5 scale-75 md:scale-95'}`}>

            <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                    <h4 className="font-semibold text-gray-800 text-base">
                        {review.tenantInfo.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                            <span className='scale-70'><Mail /></span> {review.tenantInfo.email || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className='scale-70'><Calendar /></span> {new Date(review.date).toLocaleDateString()}
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
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                    {review.comment}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;