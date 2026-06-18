import PropertyFilter from "@/components/PropertyFilter";

export default function Loading() {

    return <div>
        <div className="flex justify-center mt-3">
            <span className="loading loading-spinner text-[#0a3d62] text-5xl"></span>
        </div>
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
            <div className="max-w-6xl mx-auto">

                <div>
                    <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5 text-center">
                        All Properties
                    </h2>
                    <p className="text-[#0a3d62] max-w-150 mx-auto text-center text-lg">
                        Browse all available approved properties. Use the search and filters below to narrow down your choices.
                    </p>
                </div>

                <PropertyFilter />
            </div>
        </div>

    </div>
}