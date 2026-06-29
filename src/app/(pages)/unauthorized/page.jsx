'use client';

import { authClient } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertCircle, ArrowLeft, Home, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function UnauthorizedPage() {
    const router = useRouter();

    useEffect(() => {
        const logoutUser = async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.error('You have been logged out.');
                    },
                },
            });
        };
        logoutUser();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-sky-50 to-blue-100 p-4 sm:p-6">

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-lg bg-white/70 backdrop-blur-xl shadow-2xl border border-white/60 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden"
            >

                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />


                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="badge badge-info badge-outline badge-sm sm:badge-md mb-6 font-medium shadow-sm bg-white/50"
                >
                    Protected Resource
                </motion.div>


                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl scale-150 opacity-60"></div>
                        <ShieldAlert className="w-20 h-20 text-[#0a3d62] relative z-10 drop-shadow-md" strokeWidth={1.5} />
                    </div>
                </motion.div>


                <h1 className="text-6xl sm:text-7xl font-black text-slate-800 tracking-tighter mb-2 drop-shadow-sm">
                    403
                </h1>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-3">
                    Access Denied
                </h2>
                <p className="text-slate-500 text-sm sm:text-base px-2 sm:px-4 mb-8 leading-relaxed">
                    You don&apos;t have permission to access this page. Please verify your credentials or contact the administrator if you believe this is a mistake.
                </p>

                {/* Information Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-slate-50/60 border border-slate-200/60 rounded-2xl p-5 mb-8 text-left backdrop-blur-sm"
                >
                    <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        Possible reasons:
                    </h3>
                    <ul className="space-y-2">
                        {[
                            'You are not logged into an active account',
                            'You have insufficient role permissions',
                            'You are attempting to access restricted content',
                        ].map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <div className="min-w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                <span>{reason}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <button
                            onClick={() => router.back()}
                            className="btn btn-ghost w-full sm:w-auto text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Go Back
                        </button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link href="/login" className="btn btn-outline btn-info w-full sm:w-auto bg-white/50 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-[#3498db]/90 text-[#3498db]">
                            <LogIn className="w-4 h-4 mr-1" /> Login
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link href="/" className="btn btn-info text-white w-full sm:w-auto shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 border-none bg-[#3498db] hover:bg-[#3498db]/90">
                            <Home className="w-4 h-4 mr-1" /> Go Home
                        </Link>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}