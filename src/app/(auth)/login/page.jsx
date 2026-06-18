"use client"
import GoogleLoginButton from "@/Components/GoogleLoginButton";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [eyeSlash, setEyeSlash] = useState(false);

    const Login = async (event) => {
        event.preventDefault();
        const LoadingToast = toast.loading('Processing your request...');

        const email = event.target.email.value;
        const password = event.target.password.value;


        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Login successfully.", {
                id: LoadingToast
            });
        };

        if (error) {
            toast.error(error.message, {
                id: LoadingToast
            });
        };
    };

    return (
        <div>
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    Welcome Back to Rent-Ease
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    Sign in to your Rent-Ease account to manage rentals, view bookings, and connect with property owners effortlessly.
                </p>
            </div>

            <div className="mt-2 sm:mt-10 mb-10 sm:mb-0 p-7 sm:p-0 flex justify-center scale-90 sm:scale-100">

                <div className="justify-center mt-5">

                    <Form className="flex w-96 flex-col gap-4"
                        onSubmit={Login}
                    >

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
                            }}>
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
                                        {eyeSlash ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>

                            <Description>Must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number</Description>
                            <FieldError />

                        </TextField>

                        <div className="flex gap-2 justify-end">
                            <button type="submit" className="btn text-[#3498db] w-full rounded-2xl hover:text-white hover:bg-linear-to-r from-[#0a3d62] to-[#3498db]">
                                <Check />
                                Login
                            </button>
                        </div>
                        <div className="divider mt-0">OR</div>
                    </Form>

                    <GoogleLoginButton BtnFor={'Login'} />

                    <h1 className="font-bold text-center opacity-80 mt-3">No account yet? <Link href='/registration' className="underline italic text-[#3498db] opacity-100">Register Here</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;