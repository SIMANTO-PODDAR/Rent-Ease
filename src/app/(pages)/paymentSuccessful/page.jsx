import { stripe } from "@/lib/stripe";
import { redirect } from 'next/navigation';

const PaymentSuccessfulPage = async ({ searchParams }) => {

    const { session_id } = await searchParams;
    if (!session_id) {
        return redirect('/')
    }

    // console.log("Session ID:", session_id);

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata.bookingId;
    const transactionId = session.payment_intent;

    const Data = {
        // Update Booking Data
        transactionId: transactionId,
        paymentStatus: 'Paid',
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-bookings/${bookingId}`,
        {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },

            body: JSON.stringify(Data)
        });

    if (res.ok == true) {
        return (
            <div>
                Payment Successful
                Your TransactionId: {transactionId}
            </div>
        );
    }

    else {
        return (
            <div>
                !
            </div>
        );
    };
};

export default PaymentSuccessfulPage;