"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import {
  ShieldCheck,
  Sparkles,
  Building2,
  KeyRound,
  LogIn,
  UserPlus,
  Home,
  CheckCircle2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";

const AuthenticationContent = () => {
  const router = useRouter();
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

  // Touch swipe support state
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && mode === "login") {
      setMode("register");
    } else if (isRightSwipe && mode === "register") {
      setMode("login");
    }
  };

  // --- Login State ---
  const [loginEyeSlash, setLoginEyeSlash] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- Registration State ---
  const [regEyeSlash, setRegEyeSlash] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const fileInputRef = useRef(null);

  // ImgBB Upload Handler
  const handlePhotoUpload = async (file) => {
    if (!file) return;

    setPhotoError("");

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setUploading(true);
      const uploadingToast = toast.loading("Uploading image...");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setPhotoUrl(data.data.url);
        toast.success("Image uploaded successfully", { id: uploadingToast });
      } else {
        toast.error("Upload failed", { id: uploadingToast });
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  // --- Form Handlers ---

  // 1. Login Handler
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    const loadingToast = toast.loading("Processing your request...");

    const email = event.target.email.value;
    const password = event.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Login successfully.", {
        id: loadingToast,
      });
      router.push("/");
    }

    if (error) {
      toast.error(error.message, {
        id: loadingToast,
      });
    }

    setIsLoggingIn(false);
  };

  // 2. Registration Handler 
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (!photoUrl || photoUrl.trim() === "") {
      setPhotoError("Profile photo is required");
      toast.error("Please upload a profile photo");
      return;
    }

    setPhotoError("");
    setIsRegistering(true);
    const loadingToast = toast.loading("Processing your request..");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email(
      {
        name: name,
        email: email,
        password: password,
        image: photoUrl,
        role: "Tenant",
      },
      {
        onSuccess: async () => {
          toast.success("Registration completed successfully.", {
            id: loadingToast,
          });
          await authClient.signOut();
          setMode("login");
        },
      }
    );

    if (error) {
      toast.error(error.message, {
        id: loadingToast,
      });
    }

    setIsRegistering(false);
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] py-6 sm:py-12 px-3 sm:px-6 flex flex-col justify-center items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
      <div className="w-full max-w-xs sm:max-w-sm mb-8 sm:mb-10">
        <div className="relative flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner">
          {/* Active Highlight Pill */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-linear-to-r from-[#0a3d62] to-[#3498db] shadow-md transition-all duration-300 ease-out ${mode === "login" ? "left-1" : "left-[calc(50%+2px)]"
              }`}
          />

          <button
            type="button"
            onClick={() => setMode("login")}
            className={`relative z-10 flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 ${mode === "login"
              ? "text-white"
              : "text-slate-600 hover:text-[#0a3d62]"
              }`}
          >
            <LogIn className="size-4" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("register")}
            className={`relative z-10 flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 ${mode === "register"
              ? "text-white"
              : "text-slate-600 hover:text-[#0a3d62]"
              }`}
          >
            <UserPlus className="size-4" />
            <span>Create Account</span>
          </button>
        </div>
        <p className="text-[11px] text-center text-slate-400 mt-2 sm:hidden">
          Swipe left or right to switch modes
        </p>
      </div>

      {/* Main Unified Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-160 sm:min-h-175 lg:min-h-187.5">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:min-h-187.5 items-stretch">
          <div
            className={`order-1 ${mode === "login" ? "lg:order-1" : "lg:order-2"
              } p-6 sm:p-10 lg:p-12 flex flex-col justify-center min-h-160 sm:min-h-175 lg:min-h-187.5`}
          >
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                /* --- LOGIN FORM --- */
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full max-w-sm sm:max-w-md mx-auto my-auto"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#0a3d62]">
                      Sign In to Account
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Enter your email and password to access your dashboard
                    </p>
                  </div>

                  <Form
                    className="flex flex-col gap-4"
                    onSubmit={handleLoginSubmit}
                  >
                    {/* Email */}
                    <TextField
                      isRequired
                      name="email"
                      type="email"
                      validate={(value) => {
                        if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            value
                          )
                        ) {
                          return "Please enter a valid email address";
                        }
                        return null;
                      }}
                    >
                      <Label>Email</Label>
                      <Input
                        placeholder="Enter your Email"
                        autoComplete="username"
                      />
                      <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                      isRequired
                      minLength={8}
                      name="password"
                      type="password"
                      validate={(value) => {
                        if (value.length < 8) {
                          return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                          return "Password must contain at least one uppercase letter";
                        }
                        if (!/[a-z]/.test(value)) {
                          return "Password must contain at least one lowercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                          return "Password must contain at least one number";
                        }
                        return null;
                      }}
                    >
                      <Label>Password</Label>
                      <InputGroup>
                        <InputGroup.Input
                          className="w-full"
                          placeholder="Enter your Password"
                          type={loginEyeSlash ? "text" : "password"}
                          autoComplete="current-password"
                        />
                        <InputGroup.Suffix className="pr-0">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            onPress={() => setLoginEyeSlash(!loginEyeSlash)}
                          >
                            {loginEyeSlash ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeSlash className="size-4" />
                            )}
                          </Button>
                        </InputGroup.Suffix>
                      </InputGroup>
                      <Description>
                        Must be at least 8 characters with 1 uppercase, 1
                        lowercase, and 1 number
                      </Description>
                      <FieldError />
                    </TextField>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="btn text-[#3498db] w-full rounded-2xl hover:text-white hover:bg-linear-to-r from-[#0a3d62] to-[#3498db] mt-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Check className="size-4" />
                      <span>{isLoggingIn ? "Signing In..." : "Login"}</span>
                    </button>

                    <div className="divider my-2 text-xs text-slate-400 font-medium">
                      OR
                    </div>
                  </Form>

                  {/* Social Login */}
                  <GoogleLoginButton BtnFor={"Login"} />

                  {/* Toggle Mode Footer */}
                  <div className="mt-6 text-center text-xs sm:text-sm text-slate-600">
                    <span>Don&apos;t have an account yet? </span>
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      className="font-bold underline italic text-[#3498db] hover:text-[#0a3d62] transition-colors cursor-pointer"
                    >
                      Register Here
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* --- REGISTRATION FORM --- */
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full max-w-sm sm:max-w-md mx-auto my-auto"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#0a3d62]">
                      Create an Account
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill in your details below to get started with Rent-Ease
                    </p>
                  </div>

                  <Form
                    className="flex flex-col gap-4"
                    onSubmit={handleRegistrationSubmit}
                  >
                    {/* Name */}
                    <TextField isRequired name="name" type="text">
                      <Label>Name</Label>
                      <Input placeholder="Enter your Name" />
                      <FieldError />
                    </TextField>

                    {/* Email */}
                    <TextField
                      isRequired
                      name="email"
                      type="email"
                      validate={(value) => {
                        if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            value
                          )
                        ) {
                          return "Please enter a valid email address";
                        }
                        return null;
                      }}
                    >
                      <Label>Email</Label>
                      <Input
                        placeholder="Enter your Email"
                        autoComplete="username"
                      />
                      <FieldError />
                    </TextField>

                    {/* Image Upload Area */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#0a3d62]">
                        Profile Photo
                        <span className="text-red-500 ml-1">*</span>
                      </label>

                      {!photoUrl ? (
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          className={`relative border-2 border-dashed rounded-xl p-1 transition-colors ${dragActive
                            ? "border-[#0a3d62] bg-blue-50"
                            : photoError
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 hover:border-gray-400"
                            } ${uploading ? "opacity-50 pointer-events-none" : ""
                            }`}
                        >
                          <div className="flex flex-col items-center gap-2.5">
                            {uploading ? (
                              <>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a3d62]" />
                                <p className="text-xs sm:text-sm text-gray-600">
                                  Uploading image...
                                </p>
                              </>
                            ) : (
                              <>
                                <div
                                  className={`p-2.5 rounded-full ${photoError ? "bg-red-100" : "bg-gray-100"
                                    }`}
                                >
                                  <FaUpload
                                    className={`w-5 h-5 ${photoError
                                      ? "text-red-500"
                                      : "text-gray-600"
                                      }`}
                                  />
                                </div>
                                <div className="text-center">
                                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                                    Drop your photo here, or{" "}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        fileInputRef.current?.click()
                                      }
                                      className="text-[#0a3d62] hover:text-blue-700 underline font-semibold cursor-pointer"
                                    >
                                      browse
                                    </button>
                                  </p>
                                  <p className="text-[11px] text-gray-500 mt-0.5">
                                    JPG, PNG, GIF (Max 5MB)
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                          />
                        </div>
                      ) : (
                        /* Preview Area */
                        <div className="flex items-center justify-between p-3 border rounded-xl bg-emerald-50/50 border-emerald-300">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photoUrl}
                              alt="Profile preview"
                              className="w-14 h-14 rounded-xl object-cover border-2 border-emerald-500 shrink-0"
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-800">
                                Photo Uploaded
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                                <Check className="size-3" />
                                Ready for registration
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPhotoUrl("")}
                            className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                          >
                            Change
                          </button>
                        </div>
                      )}

                      {photoError && (
                        <p className="text-xs text-red-500 mt-1">
                          {photoError}
                        </p>
                      )}

                      <input type="hidden" name="photo" value={photoUrl} />
                    </div>

                    {/* Password */}
                    <TextField
                      isRequired
                      minLength={8}
                      name="password"
                      type="password"
                      validate={(value) => {
                        if (value.length < 8) {
                          return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                          return "Password must contain at least one uppercase letter";
                        }
                        if (!/[a-z]/.test(value)) {
                          return "Password must contain at least one lowercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                          return "Password must contain at least one number";
                        }
                        return null;
                      }}
                    >
                      <Label>Password</Label>
                      <InputGroup>
                        <InputGroup.Input
                          className="w-full"
                          placeholder="Enter your Password"
                          type={regEyeSlash ? "text" : "password"}
                          autoComplete="current-password"
                        />
                        <InputGroup.Suffix className="pr-0">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="ghost"
                            onPress={() => setRegEyeSlash(!regEyeSlash)}
                          >
                            {regEyeSlash ? (
                              <Eye className="size-4" />
                            ) : (
                              <EyeSlash className="size-4" />
                            )}
                          </Button>
                        </InputGroup.Suffix>
                      </InputGroup>
                      <Description>
                        Must be at least 8 characters with 1 uppercase, 1
                        lowercase, and 1 number
                      </Description>
                      <FieldError />
                    </TextField>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isRegistering || uploading}
                      className="btn text-[#0a3d62] w-full rounded-2xl hover:text-white hover:bg-linear-to-r from-[#0a3d62] to-[#3498db] mt-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Check className="size-4" />
                      <span>
                        {isRegistering ? "Registering..." : "Register"}
                      </span>
                    </button>

                    <div className="divider my-2 text-xs text-slate-400 font-medium">
                      OR
                    </div>
                  </Form>

                  {/* Social Login */}
                  <GoogleLoginButton BtnFor={"Register"} />

                  {/* Toggle Mode Footer */}
                  <div className="mt-6 text-center text-xs sm:text-sm text-slate-600">
                    <span>Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="font-bold underline italic text-[#0a3d62] hover:text-[#3498db] transition-colors cursor-pointer"
                    >
                      Login Here
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className={`order-2 ${mode === "login" ? "lg:order-2" : "lg:order-1"
              } bg-linear-to-br from-[#0a3d62] via-[#0e4875] to-[#3498db] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden min-h-115 sm:min-h-130 lg:min-h-187.5`}
          >
            {/* Background Decorative Blobs */}
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