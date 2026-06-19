"use client";

import { motion } from "motion/react";
import { ShieldCheck, CalendarCheck, Headset } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Properties",
        description:
            "Browse carefully reviewed and approved listings for complete peace of mind.",
    },
    {
        icon: CalendarCheck,
        title: "Easy Booking Process",
        description:
            "Reserve your ideal property in just a few simple steps.",
    },
    {
        icon: Headset,
        title: "Dedicated Support",
        description:
            "Our team is ready to assist you throughout your rental journey.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const iconVariants = {
    hover: {
        rotate: 8,
        scale: 1.1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
        },
    },
};

const WhyChooseUs = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-r from-[#0a3d62] to-[#3498db] py-10 md:py-15 mt-10">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className='my-5'>
                        <h2 className="text-4xl text-white md:text-5xl font-bold mb-4 mt-5 text-center">
                            Why Choose Us
                        </h2>
                        <p className="text-slate-100/80 max-w-150 mx-auto text-center text-lg">
                            Discover verified properties, secure online payments, transparent
                            booking processes, and dedicated support — all in one trusted
                            platform.
                        </p>
                    </div>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.03,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                },
                            }}
                            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-10 hover:bg-white/15 transition-colors duration-300 cursor-default"
                        >
                          
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#3498db]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative z-10">
                                <motion.div
                                    variants={iconVariants}
                                    whileHover="hover"
                                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/15 border border-white/20 mb-6 group-hover:bg-white/25 transition-colors duration-300"
                                >
                                    <feature.icon className="w-7 h-7 text-[#3498db]" />
                                </motion.div>

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-100/80 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;