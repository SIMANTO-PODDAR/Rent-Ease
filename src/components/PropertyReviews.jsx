import React from 'react';
import ReviewCard from './ReviewCard/ReviewCard';
import getUserToken from '@/lib/getUserToken';

const PropertyReviews = async ({ propertyId }) => {
    const userToken = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-reviews/${propertyId}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`      // verifyUserToken
        }
    });
    const reviews = await res.json();

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-6 flex items-center gap-2">
                Guest Reviews
                <span className="text-sm font-normal text-gray-400">({reviews.length})</span>
            </h3>

            <div className="space-y-6">
                {reviews.map((review) => <ReviewCard review={review} key={review._id} />)}
            </div>
        </div>
    );
};

export default PropertyReviews;