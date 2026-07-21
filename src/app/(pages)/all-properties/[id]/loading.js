export default function Loading() {
    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
            <div className="max-w-4xl mx-auto">
                {/* Back Button Skeleton */}
                <div className="mb-6">
                    <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Large Property Image Skeleton */}
                <div className="relative overflow-hidden rounded-3xl shadow-xl h-64 sm:h-100 md:h-120 mb-8 bg-gray-200 animate-pulse"></div>

                {/* Property Information Section Skeleton */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                    {/* Tags Skeleton */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="h-10 w-3/4 bg-gray-200 rounded-xl mb-3 animate-pulse"></div>

                    {/* Location Skeleton */}
                    <div className="flex items-center mb-6">
                        <div className="h-5 w-5 bg-gray-200 rounded mr-2 animate-pulse"></div>
                        <div className="h-5 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Price and Key Specs Row Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-t border-b border-gray-100 mb-6">
                        {/* Price */}
                        <div>
                            <div className="h-4 w-20 bg-gray-200 rounded mb-1 animate-pulse"></div>
                            <div className="flex items-baseline">
                                <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>

                        {/* Bedrooms */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 p-3 rounded-2xl w-12 h-12 animate-pulse"></div>
                            <div>
                                <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse"></div>
                                <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>

                        {/* Property Size */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-200 p-3 rounded-2xl w-12 h-12 animate-pulse"></div>
                            <div>
                                <div className="h-4 w-20 bg-gray-200 rounded mb-1 animate-pulse"></div>
                                <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Description Skeleton */}
                    <div>
                        <div className="h-6 w-40 bg-gray-200 rounded-xl mb-3 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Amenities Section Skeleton */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
                    <div className="h-6 w-32 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
                    <div className="flex flex-wrap gap-2.5">
                        <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="h-10 w-28 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="h-10 w-20 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
