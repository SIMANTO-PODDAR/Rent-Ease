"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import BannerImg from "../../public/BannerImg.jpg"
import { useRouter } from "next/navigation";

const propertyTypes = [
    "All Types",
    "Apartment",
    "House",
    "Room",
    "Studio",
    "Commercial",
];

const Banner = () => {
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/all-properties?search=${location}&propertyType=${propertyType}`);
    };

    return (
        <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">

            <div className="absolute inset-0 z-0">
                <Image
                    src={BannerImg}
                    alt="Property Banner"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={90}
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/50 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#3498db] animate-pulse" />
                        Trusted by 50,000+ renters worldwide
                    </span>
                </motion.div>


                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
                >
                    Find Your Perfect
                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#0a3d62] to-cyan-400">
                        Rental Home
                    </span>
                </motion.h1>


                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed"
                >
                    Browse thousands of verified rental properties. Connect with trusted
                    owners, book instantly, and pay securely — all in one place.
                </motion.p>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="w-full max-w-5xl mt-4"
                >
                    <form
                        onSubmit={handleSearch}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-2xl"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {/* Location */}
                            <div className="relative flex flex-col bg-white rounded-xl px-4 py-3 gap-1 group focus-within:ring-2 focus-within:ring-[#0a3d62] transition-all">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <MapPin size={13} className="text-[#0a3d62]" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="City, state or address"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                                />
                            </div>

                            {/* Property Type */}
                            <div className="relative flex flex-col bg-white rounded-xl px-4 py-3 gap-1 group focus-within:ring-2 focus-within:ring-[#0a3d62] transition-all">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <Home size={13} className="text-[#0a3d62]" />
                                    Property Type
                                </label>
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="text-sm text-gray-800 outline-none bg-transparent font-medium cursor-pointer appearance-none"
                                >
                                    {propertyTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Min Price */}
                            <div className="relative flex flex-col bg-white rounded-xl px-4 py-3 gap-1 group focus-within:ring-2 focus-within:ring-[#0a3d62] transition-all">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <DollarSign size={13} className="text-[#0a3d62]" />
                                    Min Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="$ Min / month"
                                    value={minPrice}
                                    min={0}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                                />
                            </div>

                            {/* Max Price */}
                            <div className="relative flex flex-col bg-white rounded-xl px-4 py-3 gap-1 group focus-within:ring-2 focus-within:ring-[#0a3d62] transition-all">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    <DollarSign size={13} className="text-[#0a3d62]" />
                                    Max Price
                                </label>
                                <input
                                    type="number"
                                    placeholder="$ Max / month"
                                    value={maxPrice}
                                    min={0}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
                                />
                            </div>
                        </div>


                        <div className="mt-3 flex justify-center">
                            <button
                                type="submit"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:from-[#0a3d62] hover:to-[#3498db] active:scale-95 text-white font-semibold text-base px-10 py-3.5 rounded-xl shadow-lg shadow-[#0a3d62]/30 transition-all duration-200 cursor-pointer"
                            >
                                <Search size={18} />
                                Search Properties
                            </button>
                        </div>
                    </form>
                </motion.div>

            </div>


            <div className="absolute -bottom-2 -left-13 -right-2 z-10">
                <svg
                    viewBox="0 0 1440 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 60L48 51.7C96 43.3 192 26.7 288 23.3C384 20 480 30 576 36.7C672 43.3 768 46.7 864 43.3C960 40 1056 30 1152 25C1248 20 1344 20 1392 20L1440 20V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V60Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}

export default Banner;