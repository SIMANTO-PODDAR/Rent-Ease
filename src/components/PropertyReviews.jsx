import { Star } from 'lucide-react';
import React from 'react';

const PropertyReviews = () => {

    // Static reviews data
    const fakeReviews = [
        {
            id: 1,
            reviewerName: "Emily Watson",
            rating: 5,
            date: "June 14, 2026",
            comment: "Absolutely loved staying here! The property is exactly as described, very clean, and in a fantastic location. The owner was extremely helpful."
        },
        {
            id: 2,
            reviewerName: "Michael Chen",
            rating: 4,
            date: "May 28, 2026",
            comment: "Great apartment with excellent amenities. The high-speed internet was perfect for my remote work. Minor noise from the street, but overall a solid experience."
        },
        {
            id: 3,
            reviewerName: "Sophia Rodriguez",
            rating: 5,
            date: "April 15, 2026",
            comment: "Wonderful experience! The space is very spacious, and the extra features like the balcony and generator backup made a huge difference. Highly recommend!"
        },
        {
            id: 4,
            reviewerName: "David Kim",
            rating: 4,
            date: "March 20, 2026",
            comment: "Very convenient location. Close to local shops and schools. Clean layout and responsive owner. I would definitely rent this again."
        }
    ];
    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#0a3d62] mb-6 flex items-center gap-2">
                Guest Reviews
                <span className="text-sm font-normal text-gray-400">({fakeReviews.length})</span>
            </h3>

            <div className="space-y-6">
                {fakeReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between items-start mb-2.5">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm sm:text-base">{review.reviewerName}</h4>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyReviews;