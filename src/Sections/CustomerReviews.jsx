import ReviewCard from '@/components/ReviewCard/ReviewCard';
import React from 'react';
import Marquee from 'react-fast-marquee';

const CustomerReviews = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home-reviews`);

    // Only 4 good reviews are fetched from the backend.
    const reviews = await res.json();
    // console.log(reviews)

    return (
        <div>
            <div className='my-15'>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    Customer Reviews
                </h2>

                {/* react - fast - marquee loops these 4 good reviews continuously to create the marquee effect. */}
                <div className='mt-10'>
                    <Marquee
                        pauseOnHover='true'
                        autoFill='true'
                    >
                        {reviews.map((review) => <ReviewCard home={true} review={review} key={review._id} />)}
                    </Marquee>

                </div>
            </div>

        </div>
    );
};

export default CustomerReviews;