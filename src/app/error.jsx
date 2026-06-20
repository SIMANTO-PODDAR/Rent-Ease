"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Silently log to monitoring service if needed
    // console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">

        {/* Animated Warning Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Glowing ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-error/30 blur-2xl"
            />
            <div className="relative p-6 rounded-full bg-base-200 border border-error/30 shadow-xl">
              <AlertTriangle
                className="w-16 h-16 text-error"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4 mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-base-content tracking-tight">
            Something went{" "}
            <span className="bg-linear-to-r from-error to-warning bg-clip-text text-transparent">
              wrong
            </span>
          </h1>
          <p className="text-base-content/55 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            We hit an unexpected bump. It&apos;s not you — it&apos;s us. Try
            again or head back home while we sort things out.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Try Again */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={reset}
            className="btn btn-error btn-lg gap-2 rounded-2xl px-8 shadow-lg shadow-error/25 text-white"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>

          {/* Go Home */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="btn btn-outline btn-lg gap-2 rounded-2xl px-8"
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Animated broken line / signal bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-end justify-center gap-1.5"
        >
          {[3, 6, 9, 6, 3].map((h, i) => (
            <motion.span
              key={i}
              animate={{
                scaleY: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              style={{ height: `${h * 4}px` }}
              className="w-2 rounded-full bg-error/50 inline-block origin-bottom"
            />
          ))}
        </motion.div>

      </div>
    </div>
  );
}