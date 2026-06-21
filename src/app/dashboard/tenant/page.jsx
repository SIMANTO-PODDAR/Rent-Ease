'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    ShieldCheck,
    Clock,
    Calendar,
    ShieldAlert,
    Home,
    Edit3,
    Fingerprint
} from 'lucide-react';
import { Avatar } from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const TenantProfile = () => {
    // User Data
    const { data: session } = authClient.useSession();

    const user = session?.user;

    // Formatting Data
    const formattedJoinedDate = new Date(user?.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    const formattedUpdatedDate = new Date(user?.updatedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    const shortId = user?.id.slice(0, 8).toUpperCase();

    // Framer Motion Animation Variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };


    return (
        <div className="min-h-screen py-5 px-4 sm:px-6 lg:px-8 font-sans">
            <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                My Profile
            </h2>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* --- Profile Header Section --- */}
                <div className="relative bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
                    {/* Gradient Banner */}
                    <div className="h-40 bg-linear-to-r from-[#0a3d62] to-[#3498db]"></div>

                    <div className="px-6 sm:px-8 pb-8">
                        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-16 sm:-mt-20 mb-4 gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                                {/* HeroUI Avatar */}
                                <Avatar className="w-28 h-28 sm:w-32 sm:h-32 text-large border-4 border-white shadow-md bg-white">
                                    <Avatar.Image alt={user?.name} src={user?.image}
                                        referrerPolicy="no-referrer" />
                                    <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>

                                <div className="pb-2">
                                    <h1 className="text-2xl mb-5 sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                                        {user?.name}
                                        {user?.emailVerified && (
                                            <ShieldCheck className="text-[#3498db]" size={24} strokeWidth={2.5} />
                                        )}
                                    </h1>
                                    <div className="flex flex-wrap items-center mt-2 gap-3">
                                        {/* DaisyUI Badge */}
                                        <div className="badge border-none bg-[#e1effe] text-[#0a3d62] px-3 py-3 font-semibold rounded-lg">
                                            {user?.role}
                                        </div>
                                        <span className="text-slate-500 text-sm font-medium">
                                            Welcome back to your Profile!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - User Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 px-1">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoCard icon={User} label="Full Name" value={user?.name} />
                            <InfoCard icon={Mail} label="Email Address" value={user?.email} />
                            <InfoCard icon={Fingerprint} label="User Role" value={user?.role} />
                            <InfoCard
                                icon={user?.emailVerified ? ShieldCheck : ShieldAlert}
                                label="Email"
                                value={user?.emailVerified ? "Verified" : "Unverified"}
                            />
                            <InfoCard icon={Calendar} label="Member Since" value={formattedJoinedDate} />
                            <InfoCard icon={Clock} label="Last Updated" value={formattedUpdatedDate} />
                        </div>
                    </div>

                    {/* Right Column - Status & Actions */}
                    <div className="space-y-6">
                        {/* <h2 className="text-xl font-bold text-slate-800 px-1">Account Summary</h2> */}

                        {/* Account Status Card */}
                        {/* <motion.div
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-linear-to-br from-[#0a3d62] to-[#125585] p-6 rounded-3xl shadow-md text-white"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-blue-200 text-sm font-medium mb-1">Account ID</p>
                                    <p className="font-mono text-lg font-semibold tracking-wider">#{shortId}***</p>
                                </div>
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <ShieldCheck size={24} className="text-blue-100" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                    <span className="text-blue-200">Role</span>
                                    <span className="font-semibold">{user?.role}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                    <span className="text-blue-200">Status</span>
                                    <span className="font-semibold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                        {user?.emailVerified ? "Verified" : "Pending"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-blue-200">Joined</span>
                                    <span className="font-semibold">{formattedJoinedDate}</span>
                                </div>
                            </div>
                        </motion.div> */}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-2 mt:2 md:mt-13">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-[#0a3d62] text-white rounded-xl font-semibold shadow-sm hover:bg-[#08304f] transition-colors"
                            >
                                <Edit3 size={18} />
                                Update Profile
                            </motion.button>

                            <Link href={'/'}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold shadow-sm hover:border-[#3498db] hover:text-[#3498db] transition-colors"
                                >
                                    <Home size={18} />
                                    Return Home
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default TenantProfile;

const InfoCard = ({ icon: Icon, label, value }) => (
    <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-[#3498db] mr-4">
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            <p className={`text-slate-800 font-semibold ${label == 'Email Address' && 'sm:text-[11px] lg:text-sm'}`}>{value}</p>
        </div>
    </motion.div>
);