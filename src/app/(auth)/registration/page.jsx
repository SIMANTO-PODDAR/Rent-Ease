"use client"

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";

const RegistrationPage = () => {
    const [eyeSlash, setEyeSlash] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [photoError, setPhotoError] = useState(""); // photo error state
    const fileInputRef = useRef(null);
    const router = useRouter();

    const handlePhotoUpload = async (file) => {
        if (!file) return;

        setPhotoError("");

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }

        if (!file.type.startsWith('image/')) {
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
            console.error(error);
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

    const Registration = async (e) => {
        e.preventDefault();


        if (!photoUrl || photoUrl.trim() === '') {
            setPhotoError("Profile photo is required");
            toast.error("Please upload a profile photo");
            return;
        }

        setPhotoError("");

        const LoadingToast = toast.loading('Processing your request..');

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const { data, error } = await authClient.signUp.email(
            {
                name: name,
                email: email,
                password: password,
                image: photoUrl,
                role: 'Tenant'
            },

            {
                onSuccess: async () => {
                    toast.success("Registration completed successfully.", {
                        id: LoadingToast
                    });
                    await authClient.signOut();
                    router.push('/login');
                }
            }
        );

        if (error) {
            toast.error(error.message, {
                id: LoadingToast
            })
        };
    };

    return (
        <div>
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    Create Your Rent-Ease Account
                </h2>
                <p className="text-[#0a3d62] max-w-2xl mx-auto text-center text-lg">
                    Join Rent-Ease today to find your perfect rental or list your property with ease and security.
                </p>
            </div>

            <div className="mt-2 sm:mt-10 mb-10 sm:mb-0 p-7 sm:p-0 flex justify-center scale-90 sm:scale-100">
                <div className="justify-center mt-5">
                    <Form
                        className="flex w-96 flex-col gap-4"
                        onSubmit={Registration}
                    >

                        {/* Name */}
                        <TextField
                            isRequired
                            name="name"
                            type="text"
                        >
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
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="Enter your Email" autoComplete="username" />
                            <FieldError />
                        </TextField>

                        {/* Img Upload - REQUIRED */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#0a3d62]">
                                Profile Photo
                                <span className="text-red-500 ml-1">*</span>
                            </label>

                            {!photoUrl ? (
                                // Upload Area
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-6 transition-colors ${dragActive
                                        ? "border-[#0a3d62] bg-blue-50"
                                        : photoError
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300 hover:border-gray-400"
                                        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        {uploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0a3d62]" />
                                                <p className="text-sm text-gray-600">Uploading...</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`p-3 rounded-full ${photoError ? 'bg-red-100' : 'bg-gray-100'}`}>
                                                    <FaUpload className={`w-6 h-6 ${photoError ? 'text-red-500' : 'text-gray-600'}`} />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Drop your photo here, or{" "}
                                                        <button
                                                            type="button"
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className="text-[#0a3d62] hover:text-blue-700 underline"
                                                        >
                                                            browse
                                                        </button>
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Supports: JPG, PNG, GIF (Max 5MB)
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
                                // Preview Area
                                <div className="flex items-center gap-4 p-3 border rounded-xl bg-gray-50 border-green-500">
                                    <img
                                        src={photoUrl}
                                        alt="Profile preview"
                                        className="w-20 h-20 rounded-xl object-cover border-2 border-green-500 shrink-0"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-gray-700">
                                            Photo uploaded
                                        </p>
                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                                            <Check className="size-3" />
                                            Ready to use
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Photo Error Message */}
                            {photoError && (
                                <p className="text-sm text-red-500 mt-1">{photoError}</p>
                            )}

                            <input
                                type="hidden"
                                name="photo"
                                value={photoUrl}
                            />
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
                                    type={eyeSlash ? "text" : "password"}
                                    autoComplete="current-password"
                                />
                                <InputGroup.Suffix className="pr-0">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setEyeSlash(!eyeSlash)}
                                    >
                                        {eyeSlash
                                            ? <Eye className="size-4" />
                                            : <EyeSlash className="size-4" />
                                        }
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                            <Description>
                                Must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number
                            </Description>
                            <FieldError />
                        </TextField>

                        <div className="flex gap-2 justify-end">
                            <button
                                type="submit"
                                className="btn text-[#0a3d62] w-full rounded-2xl hover:text-white hover:bg-linear-to-r from-[#0a3d62] to-[#3498db]"
                            >
                                <Check />
                                Register
                            </button>
                        </div>

                        <div className="divider mt-0">OR</div>
                    </Form>
                    <GoogleLoginButton BtnFor={'Register'} />
                    <h1 className="font-bold text-center opacity-80 mt-3">
                        Existing account? Continue with{" "}
                        <Link href='/login' className="underline italic text-[#0a3d62] opacity-100">
                            Login
                        </Link>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;