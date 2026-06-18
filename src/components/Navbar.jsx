"use client"
import Image from "next/image";
import Logo from "../../public/logo.png"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
    const { data } = authClient.useSession();
    const user = data?.user;
    const router = useRouter();

    const LogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Log out successfully!');
                    window.location.reload();
                    router.push("/");
                },
            },
        });
    }

    return (
        <div className="sm:sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow-sm flex-col sm:flex-row">
                <div className="sm:navbar-start gap-1">
                    <Image src={Logo} alt='Rent Ease Logo' height={40} title="Rent Ease" />
                    <span className="bg-linear-to-r from-[#0a3d62] to-[#3498db] bg-clip-text text-transparent text-2xl font-bold">Rent Ease</span>
                </div>
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4 font-bold">
                        <Link className="hover:underline" href={'/'}>Home</Link>
                        <Link className="hover:underline" href={'/all-properties'}>All Properties</Link>

                    </ul>
                </div>
                <div className="sm:navbar-end">

                    <div className={`flex gap-1 ${user ? 'hidden' : ''}`}>
                        <Link className="btn font-bold text-white  bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:outline outline-[#3498db] flex gap-2 items-center" href={'/login'}>
                            Login
                        </Link>

                        <Link className="btn font-bold text-white  bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:outline outline-[#3498db] flex gap-2 items-center" href={'/registration'}>
                            Registration
                        </Link>
                    </div>

                    <div className={`dropdown ${user ? '' : 'hidden'}`}>
                        <div className="flex gap-2 items-center">

                            <Link className="btn font-bold text-white  bg-linear-to-r from-[#0a3d62] to-[#3498db] hover:outline outline-[#3498db] flex gap-2 items-center" href={'/dashboard'}>
                                Dashboard
                            </Link>

                            <button onClick={LogOut} className="btn btn-error font-bold text-white flex gap-2 items-center" >
                                Logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;