export default function Loading() {

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                My Profile
            </h2>

            <div className="flex justify-center mt-3">
                <span className="loading loading-spinner text-[#0a3d62] text-5xl"></span>
            </div>
        </div>
    )
}