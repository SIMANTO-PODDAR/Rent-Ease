"use client"
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";


const OwnerPageHead = () => {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div
                className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0a3d62] to-[#3498db] p-6 sm:p-8"
            >
                <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Owner Analytics
                        </h1>
                        <p className="max-w-2xl text-sm text-blue-100">
                            Track your earnings, properties, and booking performance from one
                            place.
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
                            <BarChart3 className="h-7 w-7 text-white" />
                        </div>
                    </div>
                </div>
                {/* Decorative Background Shapes */}
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white" />
                    <div className="absolute bottom-0 right-10 h-20 w-20 rounded-full bg-white" />
                </div>
            </div>
        </motion.div>
    );
};

export default OwnerPageHead;