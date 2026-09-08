"use client";

import {
  ShieldCheck,
  Building2,
  KeyRound,
  Home,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const AuthShowcase = ({ mode }) => {
  return (
    <div
      className={`order-2 ${
        mode === "login" ? "lg:order-2" : "lg:order-1"
      } bg-linear-to-br from-[#0a3d62] via-[#0e4875] to-[#3498db] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden min-h-115 sm:min-h-130 lg:min-h-187.5`}
    >
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-sky-400/10 blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {mode === "login" ? (
          /* --- LOGIN SHOWCASE CONTENT --- */
          <motion.div
            key="login-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col h-full justify-between gap-8 relative z-10 my-auto"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold mb-4 text-sky-200">
                <KeyRound className="size-3.5" />
                <span>Secure Member Access</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                Your Rental Journey, Simplified and Protected.
              </h3>

              <p className="text-sky-100/90 text-sm sm:text-base mt-3 leading-relaxed">
                Stay connected with landlords, manage ongoing agreements,
                and monitor scheduled visits all from a single dashboard.
              </p>

              {/* Highlight Bullets */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Verified Properties Only
                    </h4>
                    <p className="text-xs text-sky-100/80 mt-0.5">
                      Every rental on Rent-Ease is verified for authentic
                      pricing and legitimate ownership.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs shrink-0 mt-0.5">
                    <ShieldCheck className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      End-to-End Encrypted Sessions
                    </h4>
                    <p className="text-xs text-sky-100/80 mt-0.5">
                      Bank-level session integrity with cookie-cached JWT
                      security.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs shrink-0 mt-0.5">
                    <Building2 className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Streamlined Booking
                    </h4>
                    <p className="text-xs text-sky-100/80 mt-0.5">
                      Schedule inspections and secure listings in minutes
                      with instant landlord alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Card */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between mt-6">
              <div>
                <div className="text-2xl font-black text-white">
                  10,000+
                </div>
                <div className="text-xs text-sky-200">
                  Happy Renters & Landlords
                </div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <div className="text-2xl font-black text-white">
                  99.8%
                </div>
                <div className="text-xs text-sky-200">
                  Satisfaction Score
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- REGISTRATION SHOWCASE CONTENT --- */
          <motion.div
            key="register-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col h-full justify-between gap-8 relative z-10 my-auto"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold mb-4 text-sky-200">
                <Home className="size-3.5" />
                <span>Start Your Experience</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                Find or List Your Perfect Rental Property Today.
              </h3>

              <p className="text-sky-100/90 text-sm sm:text-base mt-3 leading-relaxed">
                Experience modern property discovery with real-time
                availability, zero middlemen fees, and transparent lease
                agreements.
              </p>

              {/* Highlight Bullets */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Zero Hidden Charges
                    </h4>
                    <p className="text-xs text-sky-100/80 mt-0.5">
                      Direct communication with owners without excessive
                      brokerage markups.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs shrink-0 mt-0.5">
                    <Building2 className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Comprehensive Filters
                    </h4>
                    <p className="text-xs text-sky-100/80 mt-0.5">
                      Filter by rental budget, bedroom count, location,
                      amenities, and pet policies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs shrink-0 mt-0.5">
                    <ShieldCheck className="size-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Tenant Protection Guarantee
                    </h4>
                    <p className="text-xs text-sky-100/80 mt-0.5">
                      Enjoy digital receipts, verified transaction
                      records, and dedicated 24/7 support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Testimonial Banner */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mt-6">
              <p className="text-xs text-sky-100 italic">
                &quot;Rent-Ease made renting my new apartment painless. I found
                a home in 2 days without dealing with brokers.&quot;
              </p>
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="font-bold text-white">Sarah Jenkins</span>
                <span className="text-sky-200">Verified Tenant</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthShowcase;
