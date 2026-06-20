import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "./auth";

export const verifyRole = async (role) => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = await session?.user;

    if (!user) {
        redirect('/login')
    }

    if (user?.role != role) {
        redirect('/unauthorized')
    }

    return user;
}