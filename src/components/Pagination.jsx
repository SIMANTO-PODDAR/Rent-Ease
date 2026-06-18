'use client';

import React, { useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const { currentPage, totalPages, totalItems, limit } = pagination;

    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page);

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) {
                end = 4;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('...');
            }

            pages.push(totalPages);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-gray-100 max-w-5xl mx-auto px-4">
            {/* Info text */}
            <div className="text-sm text-gray-500 font-medium order-2 sm:order-1">
                Showing <span className="font-semibold text-gray-800">{Math.min((currentPage - 1) * limit + 1, totalItems)}</span> to{' '}
                <span className="font-semibold text-gray-800">{Math.min(currentPage * limit, totalItems)}</span> of{' '}
                <span className="font-semibold text-gray-800">{totalItems}</span> properties
            </div>

            <div className="flex items-center gap-1.5 order-1 sm:order-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isPending}
                    className="flex items-center justify-center p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all cursor-pointer active:scale-95"
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={16} />
                </button>

                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium select-none"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;
                    return (
                        <button
                            key={`page-${page}`}
                            onClick={() => handlePageChange(page)}
                            disabled={isPending}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-sm transition-all cursor-pointer active:scale-95 ${
                                isActive
                                    ? 'bg-[#0a3d62] text-white shadow-md shadow-[#0a3d62]/10'
                                    : 'border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || isPending}
                    className="flex items-center justify-center p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all cursor-pointer active:scale-95"
                    aria-label="Next Page"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
