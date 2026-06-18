import React from 'react';

const PropertyDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/${id}`);

    const property = await res.json();
    return (
        <div>
            PropertyDetailsPage {property.title}
        </div>
    );
};

export default PropertyDetailsPage;