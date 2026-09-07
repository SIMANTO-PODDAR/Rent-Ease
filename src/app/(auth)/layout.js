import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Authentication | Rent-Ease",
  description:
    "Sign in or register for Rent-Ease to manage rental properties, view bookings, and connect seamlessly.",
};

export default function AuthenticationLayout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/40 text-slate-800 antialiased">
      {/* Minimal Authentication Header */}
      <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Brand & Logo Link */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group transition-transform active:scale-98"
            aria-label="Rent-Ease Homepage"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <Image
                src="/logo.png"
                alt="Rent-Ease Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <span className="bg-linear-to-r from-[#0a3d62] to-[#3498db] bg-clip-text text-transparent text-lg sm:text-2xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
              Rent Ease
            </span>
          </Link>

          {/* Right Navigation & Trust Indicators */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Security Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600">
              <ShieldCheck className="size-3.5 text-[#3498db]" />
              <span>Secure Authentication</span>
            </div>

            {/* Back to Home Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0a3d62] hover:bg-slate-50 transition-all active:scale-98"
            >
              <ArrowLeft className="size-3.5 sm:size-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Authentication Content */}
      <main className="flex-1 flex flex-col justify-center">
        {children}
      </main>

      {/* Minimal Authentication Footer */}
      <footer className="relative w-full bg-white border-t border-slate-100 mt-auto">
        {/* Decorative Brand Accent Line */}
        <div className="h-0.5 w-full bg-linear-to-r from-[#0a3d62] via-[#0e4875] to-[#3498db]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            &copy; {currentYear} RentEase. All rights reserved.
          </p>

          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/all-properties"
              className="hover:text-[#0a3d62] transition-colors font-medium"
            >
              Properties
            </Link>
            <Link
              href="/"
              className="hover:text-[#0a3d62] transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="hover:text-[#0a3d62] transition-colors font-medium"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:info@rentease.com"
              className="hover:text-[#0a3d62] transition-colors inline-flex items-center gap-1 font-medium"
            >
              <Mail className="size-3 text-[#3498db]" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
