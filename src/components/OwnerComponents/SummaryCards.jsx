"use client"

import { CardContent } from "@heroui/react";
import { DollarSign, Building2, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const SummaryCards = ({ TotalEarnings, TotalProperties, TotalBookings }) => {
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total Earnings"
                    value={TotalEarnings}
                    description="Booking payments received"
                    icon={DollarSign}
                    accentClass="bg-[#0a3d62]"
                />
                <StatCard
                    title="Total Properties"
                    value={TotalProperties}
                    description="Properties created"
                    icon={Building2}
                    accentClass="bg-[#3498db]"
                />
                <StatCard
                    title="Total Bookings"
                    value={TotalBookings}
                    description="Confirmed bookings"
                    icon={CalendarCheck}
                    accentClass="bg-gradient-to-r from-[#0a3d62] to-[#3498db]"
                />
            </div>
        </motion.div>
    );
};

export default SummaryCards;



// Card 
function StatCard({ title, value, description, icon: Icon, accentClass }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };
    return (
        <motion.div variants={itemVariants}>
            <CardContent className="h-full rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex flex-col gap-4 p-6">

                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClass}`}
                    >
                        <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                            {title === "Total Earnings"
                                ? `$${value.toLocaleString()}`
                                : value}
                        </h3>
                        <p className="text-sm text-gray-400">{description}</p>
                    </div>
                </div>
            </CardContent>
        </motion.div>
    );
}