"use client";

import { Check } from "@gravity-ui/icons";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";

const ProfileImageUpload = ({
  photoUrl,
  onPhotoChange,
  photoError,
  onPhotoError,
  isUploading,
  onUploadingChange,
}) => {
  const [internalUploading, setInternalUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const uploading = isUploading !== undefined ? isUploading : internalUploading;

  const setUploadingState = (val) => {
    setInternalUploading(val);
    onUploadingChange?.(val);
  };

  // ImgBB Upload Handler
  const handlePhotoUpload = async (file) => {
    if (!file) return;

    onPhotoError?.("");

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setUploadingState(true);
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
        onPhotoChange(data.data.url);
        toast.success("Image uploaded successfully", { id: uploadingToast });
      } else {
        toast.error("Upload failed", { id: uploadingToast });
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploadingState(false);
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

  return (
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
          className={`relative border-2 border-dashed rounded-xl p-1 transition-colors ${
            dragActive
              ? "border-[#0a3d62] bg-blue-50"
              : photoError
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
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
                  className={`p-2.5 rounded-full ${
                    photoError ? "bg-red-100" : "bg-gray-100"
                  }`}
                >
                  <FaUpload
                    className={`w-5 h-5 ${
                      photoError ? "text-red-500" : "text-gray-600"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    Drop your photo here, or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
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
            onClick={() => onPhotoChange("")}
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
  );
};

export default ProfileImageUpload;
