export default function Loading() {

    return (
        <div className="mt-10 max-w-4xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    All Properties
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    Monitor, review, and control all property submissions.
                </p>
            </div>


            <div className="flex justify-center mt-3">
                <span className="loading loading-spinner text-[#0a3d62] text-5xl"></span>
            </div>
        </div>
    )
}