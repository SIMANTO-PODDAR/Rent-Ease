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
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "./authValidation";

const LoginForm = ({ onSwitchToRegister }) => {
  const router = useRouter();
  const [loginEyeSlash, setLoginEyeSlash] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
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
          validate={validateEmail}
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
          validate={validatePassword}
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
          onClick={onSwitchToRegister}
          className="font-bold underline italic text-[#3498db] hover:text-[#0a3d62] transition-colors cursor-pointer"
        >
          Register Here
        </button>
      </div>
    </motion.div>
  );
};

export default LoginForm;
