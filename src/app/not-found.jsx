"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">

        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-6"
        >
          <span className="text-[10rem] sm:text-[14rem] font-black leading-none select-none bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            404
          </span>

          {/* Floating blur blob behind number */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
          </div>
        </motion.div>

        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <div className="p-5 rounded-full bg-base-200 border border-base-300 shadow-inner">
            <Search className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-3 mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
            Page Not Found
          </h1>
          <p className="text-base-content/60 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Go Home */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary btn-lg gap-2 rounded-2xl px-8 shadow-lg shadow-primary/30"
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
          </Link>

          {/* Go Back */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg gap-2 rounded-2xl px-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-primary/50 inline-block"
            />
          ))}
        </motion.div>

      </div>
    </div>
  );
}