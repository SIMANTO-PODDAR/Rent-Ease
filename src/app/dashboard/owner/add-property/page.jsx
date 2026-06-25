"use client"

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Upload, Check, Building } from "lucide-react";

const AddPropertyPage = () => {
    const fileInputRef = useRef(null);
    const { data: session } = authClient.useSession();
    const user = session?.user;


    // data state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("Apartment");
    const [rentPrice, setRentPrice] = useState("");
    const [rentType, setRentType] = useState("Monthly");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [size, setSize] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [extraFeatures, setExtraFeatures] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const amenitiesList = [
        "Parking",
        "Lift",
        "24/7 Security",
        "CCTV",
        "Children Play Area",
        "Intercom",
        "Gym",
        "Balcony",
        "Generator Backup"
    ];

    const extraFeaturesList = [
        "Furnished",
        "Semi-Furnished",
        "Full Furnished",
        "Balcony",
        "AC",
        "AC in all rooms",
        "Rooftop Garden",
        "Generator Backup",
        "Pet Friendly",
        "Internet Ready",
        "Near Metro",
        "Fire Safety"
    ];


    // img upload
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
            handleImageUpload(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;

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
                setImageUrl(data.data.url);
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

    const handleAmenityChange = (amenity) => {
        if (amenities.includes(amenity)) {
            setAmenities(amenities.filter(item => item !== amenity));
        } else {
            setAmenities([...amenities, amenity]);
        }
    };

    const handleExtraFeatureChange = (feature) => {
        if (extraFeatures.includes(feature)) {
            setExtraFeatures(extraFeatures.filter(item => item !== feature));
        } else {
            setExtraFeatures([...extraFeatures, feature]);
        }
    };

    const addProperty = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to add a property.");
            return;
        }

        if (!imageUrl) {
            toast.error("Please upload a property image.");
            return;
        }

        const propertyData = {
            title: title,
            description: description,
            location: location,
            propertyType: propertyType,
            rentPrice: Number(rentPrice),
            rentType: rentType,
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            size: Number(size),
            amenities: amenities,
            image: imageUrl,
            extraFeatures: extraFeatures,
            status: "Pending",
            rejectionFeedback: '',
            ownerId: user.id,
            owner: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            createdAt: new Date().toISOString()
        };

        const loadingToast = toast.loading("Adding property...");
        try {
            const { data: tokenData } = await authClient.token();
            const userToken = tokenData?.token;

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userToken}`    // verifyUserToken
                },
                body: JSON.stringify(propertyData),
            });

            if (res.ok) {
                toast.success("Property added successfully!", { id: loadingToast });
                window.location.reload();
            } else {
                const errData = await res.json().catch(() => ({}));
                toast.error(errData.message || "Failed to add property.", { id: loadingToast });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.", { id: loadingToast });
        }
    };


    return (
        <div className="mt-10 max-w-4xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    Add Your Property
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    List your property in minutes. Fill in the details, upload images, and reach potential tenants instantly.
                </p>
            </div>

            <form onSubmit={addProperty} className="bg-white shadow-xl rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 mb-12">
                {/* Basic Details Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-4 flex items-center gap-2">
                        <Building className="w-5 h-5 text-[#3498db]" />
                        Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Property Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                maxLength={30}
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Premium Residential Apartment"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                maxLength={30}
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. Bashundhara R/A, Dhaka"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Property Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            >
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Room">Room</option>
                                <option value="Studio">Studio</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rent Price ($) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={100000000}
                                required
                                value={rentPrice}
                                onChange={(e) => setRentPrice(e.target.value)}
                                placeholder="e.g. 1500"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rent Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={rentType}
                                onChange={(e) => setRentType(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Daily">Daily</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Property Size (sqft) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={100000000}
                                required
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                placeholder="e.g. 1200"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bedrooms <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={1000}
                                required
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                placeholder="e.g. 3"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bathrooms <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={1000}
                                required
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                                placeholder="e.g. 2"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Description & Img Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-4 flex items-center gap-2">
                        Description & Media
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                maxLength={200}
                                required
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the comfort, location perks, and main offerings..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white resize-none"
                            />
                            <div className="text-right text-xs text-gray-400 mt-1">
                                {description.length}/200 characters
                            </div>
                        </div>

                        {/* Img Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Property Image <span className="text-red-500">*</span>
                            </label>

                            {!imageUrl ? (
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-6 transition-colors text-center ${dragActive
                                        ? "border-[#0a3d62] bg-blue-50"
                                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
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
                                                <div className="p-3 rounded-full bg-gray-100">
                                                    <Upload className="w-6 h-6 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Drop your photo here, or{" "}
                                                        <button
                                                            type="button"
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className="text-[#0a3d62] hover:text-blue-700 underline font-semibold"
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
                                <div className="flex items-center gap-4 p-3 border border-green-500 rounded-xl bg-green-50/30">
                                    <img
                                        src={imageUrl}
                                        alt="Property preview"
                                        className="w-24 h-16 rounded-lg object-cover border border-green-500 shrink-0"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Image uploaded</p>
                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium mt-0.5">
                                            <Check className="w-3.5 h-3.5" /> Ready
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Amenities Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-3">Amenities</h3>
                    <p className="text-xs text-gray-400 mb-4">Select all features included with the property lease.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {amenitiesList.map((amenity) => (
                            <label key={amenity} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={amenities.includes(amenity)}
                                    onChange={() => handleAmenityChange(amenity)}
                                    className="w-4 h-4 rounded text-[#0a3d62] border-gray-300 focus:ring-[#3498db]"
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Extra Features Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-3">Extra Features</h3>
                    <p className="text-xs text-gray-400 mb-4">Select any additional descriptors or conveniences.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {extraFeaturesList.map((feature) => (
                            <label key={feature} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={extraFeatures.includes(feature)}
                                    onChange={() => handleExtraFeatureChange(feature)}
                                    className="w-4 h-4 rounded text-[#0a3d62] border-gray-300 focus:ring-[#3498db]"
                                />
                                {feature}
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Owner & Status Details */}
                <div>
                    <h3 className="text-xl font-bold text-[#0a3d62] mb-4">Owner Info & Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Owner Name</label>
                            <input
                                type="text"
                                value={user?.name || ""}
                                disabled
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Owner Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                disabled
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                            <input
                                type="text"
                                value="Pending"
                                disabled
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-semibold cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full py-4 rounded-2xl bg-linear-to-r from-[#0a3d62] to-[#3498db] text-white font-bold text-lg hover:shadow-lg transition-all cursor-pointer hover:opacity-95 text-center flex items-center justify-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        Submit Property Listing
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPropertyPage;