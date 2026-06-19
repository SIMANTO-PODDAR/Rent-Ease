import { stripe } from "@/lib/stripe";

const PaymentSuccessfulPage = async ({ searchParams }) => {

    const { session_id } = await searchParams;
    if (!session_id) {
        throw new Error
    }

    console.log("Session ID:", session_id);

    const session = await stripe.checkout.sessions.retrieve(session_id);

    return (
        <div>
            Payment Successful
        </div>
    );
};

export default PaymentSuccessfulPage;