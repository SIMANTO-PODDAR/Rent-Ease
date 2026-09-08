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
import { motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileImageUpload from "./ProfileImageUpload";
import { validateEmail, validatePassword } from "./authValidation";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [regEyeSlash, setRegEyeSlash] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [uploading, setUploading] = useState(false);

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
          onSwitchToLogin();
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
          validate={validateEmail}
        >
          <Label>Email</Label>
          <Input
            placeholder="Enter your Email"
            autoComplete="username"
          />
          <FieldError />
        </TextField>

        {/* Image Upload Area */}
        <ProfileImageUpload
          photoUrl={photoUrl}
          onPhotoChange={setPhotoUrl}
          photoError={photoError}
          onPhotoError={setPhotoError}
          isUploading={uploading}
          onUploadingChange={setUploading}
        />

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={validatePassword}
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
          onClick={onSwitchToLogin}
          className="font-bold underline italic text-[#0a3d62] hover:text-[#3498db] transition-colors cursor-pointer"
        >
          Login Here
        </button>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
