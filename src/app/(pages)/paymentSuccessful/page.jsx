import { stripe } from "@/lib/stripe";
import Link from "next/link";
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center p-8">
                        {/* Success Icon */}
                        <div className="text-success mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* Badge */}
                        <div className="badge badge-success badge-sm font-semibold mb-3 text-white">Payment Completed</div>

                        {/* Heading */}
                        <h2 className="card-title text-2xl font-bold text-gray-800 mb-1">Payment Successful!</h2>
                        <p className="text-gray-600 text-sm mb-5">Your booking has been confirmed and paid in full.</p>

                        {/* Reassurance Alert */}
                        <div className="w-full bg-green-50 rounded-lg p-4 border border-green-200 text-left mb-5">
                            <div className="flex items-center gap-2 mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-bold text-green-800 text-sm">Safe to proceed</span>
                            </div>
                            <p className="text-xs text-green-700 leading-relaxed">
                                Payment has been successfully completed and the transaction is confirmed. It is now safe to leave, refresh, or close this page.
                            </p>
                        </div>

                        {/* Transaction ID */}
                        <div className="w-full bg-gray-50 rounded-lg p-4 mb-5 border border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Transaction ID</p>
                            <p className="text-sm font-mono text-gray-800 break-all">{transactionId}</p>
                        </div>

                        {/* Thank You Message */}
                        <p className="text-sm text-gray-500 font-medium mb-6">Thank you for choosing our services!</p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Link href="/" className="btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 border-none">
                                Back to Home
                            </Link>
                            <a href="/my-bookings" className="btn flex-1 bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white border-none">
                                My Bookings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center p-8">
                        {/* Failed Icon */}
                        <div className="text-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* Heading */}
                        <h2 className="card-title text-2xl font-bold text-gray-800 mb-4">Payment Verification Failed</h2>

                        {/* Error Message Section */}
                        <div className="w-full bg-red-50 rounded-lg p-5 mb-6 border border-red-100 text-left">
                            <p className="text-sm text-red-800 mb-3 font-semibold border-b border-red-200 pb-2">
                                We could not verify your payment confirmation at this moment.
                            </p>
                            <ul className="text-xs text-red-700 list-disc list-inside space-y-2">
                                <li>Please <strong>do not</strong> make another payment immediately.</li>
                                <li>Check your booking and payment status first.</li>
                                <li>If money was deducted from your account, please contact our support team.</li>
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Link href="/" className="btn flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 border-none">
                                Back Home
                            </Link>
                            <a href={`/support`} className="btn flex-1 bg-[#3498db] hover:bg-[#3498db]/90 text-white border-none">
                                Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default PaymentSuccessfulPage;