import { BookingTable } from "@/components/Booking/BookingTable";
import { auth } from "@/lib/auth";
import getUserToken from "@/lib/getUserToken";
import { headers } from "next/headers";

const MyBookingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const tenantId = await session?.user?.id;

    const userToken = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tenant-bookings/${tenantId}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`      // verifyUserToken
        }
    });

    const bookingData = await res.json();


    return (
        <div className="mt-10">
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    My Bookings
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    See all your bookings and their payment status.
                </p>
            </div>

            <div>
                <BookingTable bookingData={bookingData} />
            </div>

            {
                bookingData.length == 0 && (<h2 className="text-xl text-[#0a3d62] md:text-2xl font-bold mb-4 mt-4 text-center card m-3 w-80 mx-auto">
                    No Booking Data Yet.
                </h2>)
            }
        </div>
    );
};

export default MyBookingsPage;

