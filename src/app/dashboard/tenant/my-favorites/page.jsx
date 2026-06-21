import { FavoritesTable } from '@/components/Favorites/FavoritesTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyFavoritesPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = await session?.user?.id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-favorites/${userId}`);

    const FavoriteProperties = await res.json();
    return (
        <div className="mt-10">
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    My Favorite Properties
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    Start exploring properties and add your favorites to see them here.
                </p>
            </div>

            <div>
                <FavoritesTable FavoriteProperties={FavoriteProperties} />
            </div>

            {
                FavoriteProperties.length == 0 && (<h2 className="text-xl text-[#0a3d62] md:text-2xl font-bold mb-4 mt-4 text-center card m-3 w-80 mx-auto">
                    No Favorites Yet
                </h2>)
            }
        </div>
    );
};

export default MyFavoritesPage;