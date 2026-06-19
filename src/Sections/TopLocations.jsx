"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin,
    Home,
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
    Trees,
    Train,
    Coffee
} from "lucide-react";

import gulshanImg from "../../public/gulshan.jpg";
import dhanmondiImg from "../../public/dhanmondi.png";
import uttaraImg from "../../public/uttara.jpg";

// --- Static Data ---
const locations = [
    {
        id: "gulshan",
        name: "Gulshan",
        description: "Premium diplomatic zone offering upscale dining, elite shopping, and high-security residential living.",
        propertyCount: "150+",
        image: gulshanImg,
        badges: [
            { text: "Verified Properties", icon: CheckCircle2 },
            { text: "Safe Neighborhood", icon: ShieldCheck },
            { text: "High Demand", icon: TrendingUp },
        ],
    },
    {
        id: "dhanmondi",
        name: "Dhanmondi",
        description: "A vibrant cultural hub blending historic charm with modern lakeside apartments and top-tier schools.",
        propertyCount: "220+",
        image: dhanmondiImg,
        badges: [
            { text: "Family Friendly", icon: Home },
            { text: "Lakeside Area", icon: Coffee },
            { text: "Central Location", icon: MapPin },
        ],
    },
    {
        id: "uttara",
        name: "Uttara",
        description: "Peaceful, meticulously planned residential sectors featuring rapid metro access and ample green parks.",
        propertyCount: "180+",
        image: uttaraImg,
        badges: [
            { text: "Metro Access", icon: Train },
            { text: "Quiet & Green", icon: Trees },
            { text: "High Demand", icon: TrendingUp },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
        },
    },
};

export default function TopLocations() {
    return (
        <section className="w-full py-16 bg-slate-50 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                        Top Locations
                    </h2>
                    <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                        Explore our most popular and highly sought-after rental destinations tailored to your lifestyle.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {locations.map((location) => (
                        <motion.article
                            key={location.id}
                            variants={cardVariants}
                            className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer border border-slate-100"
                        >

                            <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                                <Image
                                    src={location.image}
                                    alt={`${location.name} neighborhood`}
                                    fill
                                    priority
                                    quality={90}
                                    className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                            </div>


                            <div className="flex flex-col grow p-6">


                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                                        {location.name}
                                    </h3>
                                    <div className="p-2 bg-blue-50 rounded-full text-[#3498db] group-hover:bg-[#0a3d62] group-hover:text-white transition-colors duration-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                </div>

                                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {location.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm font-medium text-[#3498db] mb-6 bg-blue-50/50 w-fit px-3 py-1.5 rounded-lg">
                                    <Home className="w-4 h-4" />
                                    {location.propertyCount} Properties Available
                                </div>


                                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                    {location.badges.map((badge, index) => {
                                        const Icon = badge.icon;
                                        return (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                                            >
                                                <Icon className="w-3.5 h-3.5 text-slate-500" />
                                                {badge.text}
                                            </span>
                                        );
                                    })}
                                </div>

                            </div>
                        </motion.article>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}