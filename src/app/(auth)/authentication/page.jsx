"use client";

import AuthModeToggle from "@/components/authentication/AuthModeToggle";
import AuthShowcase from "@/components/authentication/AuthShowcase";
import LoginForm from "@/components/authentication/LoginForm";
import RegisterForm from "@/components/authentication/RegisterForm";
import { Sparkles } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const AuthenticationContent = () => {
  const searchParams = useSearchParams();

  // Mode: 'login' | 'register' (derived from URL or user override)
  const [userSelectedMode, setUserSelectedMode] = useState(null);
  const urlMode = searchParams.get("mode");
  const mode =
    userSelectedMode ??
    (urlMode === "register" || urlMode === "signup" ? "register" : "login");

  const setMode = (newMode) => {
    setUserSelectedMode(newMode);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-6 sm:py-12 px-3 sm:px-6 flex flex-col justify-center items-center">
      {/* Top Header & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 min-h-27.5 sm:min-h-30 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3498db]/10 border border-[#3498db]/20 text-[#0a3d62] text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="size-4 text-[#3498db]" />
          <span>Rent-Ease Portal Authentication</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a3d62] tracking-tight">
          Rent&nbsp;with&nbsp;Ease. List&nbsp;with&nbsp;Confidence.
        </h1>

        <p className="text-[#0a3d62]/80 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Discover properties, list your space, and connect with the right people- all through Rent-Ease.
        </p>
      </div>

      {/* Mode Switcher Toggle (Desktop & Mobile) */}
      <AuthModeToggle mode={mode} onModeChange={setMode} />

      {/* Main Unified Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-160 sm:min-h-175 lg:min-h-187.5">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:min-h-187.5 items-stretch">
          {/* Form Column - order swapped on desktop based on mode */}
          <div
            className={`order-1 ${mode === "login" ? "lg:order-1" : "lg:order-2"
              } p-6 sm:p-10 lg:p-12 flex flex-col justify-center min-h-160 sm:min-h-175 lg:min-h-187.5`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mode === "login" ? (
                <LoginForm
                  key="login-form"
                  onSwitchToRegister={() => setMode("register")}
                />
              ) : (
                <RegisterForm
                  key="register-form"
                  onSwitchToLogin={() => setMode("login")}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Showcase Column - order swapped on desktop based on mode */}
          <AuthShowcase mode={mode} />
        </div>
      </div>
    </div>
  );
};

const AuthenticationPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0a3d62]" />
        </div>
      }
    >
      <AuthenticationContent />
    </Suspense>
  );
};

export default AuthenticationPage;