export default function Loading() {

    return (
        <div className="mt-10">
            <div>
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                    My Property Booking Requests
                </h2>
                <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                    Review and manage booking requests for your listed properties.
                </p>
            </div>



            <div className="flex justify-center mt-3">
                <span className="loading loading-spinner text-[#0a3d62] text-5xl"></span>
            </div>
        </div>
    )
}