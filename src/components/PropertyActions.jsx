"use client";

import React, { useState } from 'react';
import { Heart, Calendar, Star, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const PropertyActions = ({ propertyId, propertyName }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const userName = user?.name;
    const userEmail = user?.email;
    const userId = user?.id;
    const date = new Date();
    const role = user?.role;

    const handleFavorite = async () => {

        if (!user) {
            toast.error('Please login and try again.');
            return;
        };

        const Data = {
            propertyId: propertyId,
            propertyName: propertyName,
            userId: userId,
            date: date,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-favorites`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        setIsFavorite(true);
        toast.success("Added to Favorites!")
    };

    const handleBook = () => {
        toast.info("Booking functionality is coming soon!", {
            icon: '📅',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login and try again.');
            return;
        };

        if (!reviewText.trim()) {
            toast.error("Please write a review comment.", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        // API call
        // console.log(`user: ${userName}, ${userEmail}, ${date},
        //     Rating: ${rating}, Comment: ${reviewText},
        //     ${userId}${propertyId}  `)

        const Data = {
            propertyId: propertyId,
            tenantInfo: {
                name: userName,
                id: userId,
                email: userEmail,
            },
            rating: rating,
            comment: reviewText,
            date: date,
            role: role,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-reviews`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (res.ok == true) {
            toast.success('Rating successful.');

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        else {
            toast.error('Something went wrong! Try again.');
        };
    };

    return (
        <div className="space-y-6">
            {/* Primary booking and favoriting buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleBook}
                    className="flex-1 bg-linear-to-r from-[#0a3d62] to-[#3498db] text-white py-3.5 px-6 rounded-xl font-bold hover:opacity-90 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Calendar className="w-5 h-5" />
                    Book Property
                </button>
                <button
                    onClick={handleFavorite}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${isFavorite
                        ? "border-red-500 bg-red-50 text-red-500 hover:bg-red-100"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                >
                    <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                    {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                </button>
            </div>

            {/* Divider line */}
            <div className="border-t border-gray-100 my-6"></div>

            {/* Rating and Review Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
                <h4 className="text-md font-bold text-[#0a3d62] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#3498db]" />
                    Give Rating & Write Review
                </h4>

                {/* Give Rating - Stars Selector */}
                <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Rating</span>
                    <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                            const isStarred = starValue <= (hoverRating || rating);
                            return (
                                <button
                                    type="button"
                                    key={starValue}
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHoverRating(starValue)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${isStarred
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-gray-200"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                        {rating > 0 && (
                            <span className="text-sm font-bold text-gray-500 ml-2">
                                {rating} out of 5
                            </span>
                        )}
                    </div>
                </div>

                {/* Write Review - Textarea */}
                <div>
                    <label htmlFor="review-textarea" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Review</label>
                    <textarea
                        id="review-textarea"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your thoughts about this property..."
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#3498db] focus:ring-1 focus:ring-[#3498db] transition-all"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#0a3d62] text-white py-2.5 px-6 rounded-xl font-bold hover:bg-opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                    <Send className="w-4 h-4" />
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default PropertyActions;
