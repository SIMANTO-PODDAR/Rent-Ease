"use client";

import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LayoutDashboard, LogOut as LogOutIcon, UserPlus } from "lucide-react";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();
    const pathname = usePathname();

    const role = (user?.role || "tenant").toLowerCase();

    const LogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Log out successfully!");
                    window.location.reload();
                    router.push("/");
                },
            },
        });
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Properties", href: "/all-properties" },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
            <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2 gap-x-3 py-2.5 sm:py-0 sm:h-20 px-3 sm:px-6">
                {/* 1. Left: Brand & Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0 group transition-transform active:scale-98"
                >
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                        <Image
                            src={Logo}
                            alt="Rent Ease Logo"
                            fill
                            sizes="40px"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="bg-linear-to-r from-[#0a3d62] to-[#3498db] bg-clip-text text-transparent text-lg sm:text-2xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                        Rent Ease
                    </span>
                </Link>

                {/* 2. Center: Navigation Links */}
                <nav className="flex items-center gap-1 sm:gap-2">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${active
                                        ? "text-[#0a3d62] bg-[#3498db]/10"
                                        : "text-slate-600 hover:text-[#0a3d62] hover:bg-slate-50"
                                    }`}
                            >
                                {link.name}
                                {active && (
                                    <span className="hidden sm:block absolute bottom-1 left-4 right-4 h-0.5 bg-[#0a3d62] rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* 3. Right: Auth Actions */}
                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    {isPending ? (
                        <div className="h-8 sm:h-10 w-28 sm:w-36 bg-slate-100 animate-pulse rounded-lg sm:rounded-xl" />
                    ) : user ? (
                        <div className="flex items-center gap-1.5 sm:gap-3">
                            {/* User Avatar + Role Badge */}
                            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="w-6 h-6 rounded-full bg-[#0a3d62] text-white flex items-center justify-center text-[10px] font-bold uppercase">
                                    {user?.name ? user.name.charAt(0) : "U"}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-semibold text-slate-800 leading-tight max-w-25 truncate">
                                        {user?.name || "Account"}
                                    </span>
                                    <span className="text-[9px] font-bold text-[#3498db] uppercase tracking-wider">
                                        {user?.role || "Tenant"}
                                    </span>
                                </div>
                            </div>

                            {/* Dashboard Button */}
                            <Link
                                href={`/dashboard/${role}`}
                                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xs"
                            >
                                <LayoutDashboard className="size-3.5 sm:size-4" />
                                <span>Dashboard</span>
                            </Link>

                            {/* Logout Button */}
                            <button
                                onClick={LogOut}
                                className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                                title="Sign out"
                            >
                                <LogOutIcon className="size-3.5 sm:size-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 sm:gap-2">
                            <Link
                                href="/login"
                                className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-[#0a3d62] hover:bg-slate-100 transition-all"
                            >
                                Login
                            </Link>

                            <Link
                                href="/registration"
                                className="flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xs"
                            >
                                <UserPlus className="size-3.5 sm:size-4" />
                                <span>Registration</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
