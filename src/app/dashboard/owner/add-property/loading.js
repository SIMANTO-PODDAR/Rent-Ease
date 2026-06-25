export default function Loading() {

    return (
        <div className="mt-10 max-w-4xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    Add Your Property
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    List your property in minutes. Fill in the details, upload images, and reach potential tenants instantly.
                </p>
            </div>

            <div className="flex justify-center mt-3">
                <span className="loading loading-spinner text-[#0a3d62] text-5xl"></span>
            </div>
        </div>
    )
}