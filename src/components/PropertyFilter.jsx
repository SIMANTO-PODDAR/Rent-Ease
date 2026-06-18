'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, MapPin, Home, SlidersHorizontal, RotateCcw } from 'lucide-react';

const propertyTypes = [
    "All Types",
    "Apartment",
    "House",
    "Room",
    "Studio",
    "Commercial",
];

export default function PropertyFilter({ initialSearch, initialPropertyType, initialSort }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const [search, setSearch] = useState(initialSearch || '');
    const [propertyType, setPropertyType] = useState(initialPropertyType || 'All Types');
    const [sort, setSort] = useState(initialSort || '');
 
    useEffect(() => {
        setSearch(initialSearch || '');
        setPropertyType(initialPropertyType || 'All Types');
        setSort(initialSort || '');
    }, [initialSearch, initialPropertyType, initialSort]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        if (search.trim()) {
            params.set('search', search.trim());
        }
        if (propertyType && propertyType !== 'All Types') {
            params.set('propertyType', propertyType);
        }
        if (sort) {
            params.set('sort', sort);
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleReset = () => {
        setSearch('');
        setPropertyType('All Types');
        setSort('');
        startTransition(() => {
            router.push(pathname);
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-5xl mx-auto mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Search by Location */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#3498db]" />
                        Search Location
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="City, area or address..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleApplyFilters();
                            }}
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent focus:bg-white transition-all duration-200"
                        />
                        <Search className="absolute left-3.5 top-3.5 text-gray-400 size-4 group-focus-within:text-[#3498db] transition-colors" />
                    </div>
                </div>

                {/* Filter by Property Type */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Home size={14} className="text-[#3498db]" />
                        Property Type
                    </label>
                    <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent focus:bg-white transition-all duration-200 cursor-pointer appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1em',
                        }}
                    >
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sorting options */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <SlidersHorizontal size={14} className="text-[#3498db]" />
                        Sort by Price
                    </label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent focus:bg-white transition-all duration-200 cursor-pointer appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1em',
                        }}
                    >
                        <option value="">Default Sorting</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-4 mt-6 pt-4 border-t border-gray-100">
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer active:scale-95"
                >
                    <RotateCcw size={15} />
                    Reset
                </button>
                <button
                    onClick={handleApplyFilters}
                    disabled={isPending}
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:from-[#082d49] hover:to-[#2980b9] text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md shadow-[#0a3d62]/10 hover:shadow-lg hover:shadow-[#0a3d62]/20 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                    {isPending ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Applying...
                        </div>
                    ) : (
                        'Apply Filters'
                    )}
                </button>
            </div>
        </div>
    );
}
