import OwnerPageHead from "@/components/OwnerComponents/OwnerPageHead";

export default function Loading() {

    return (
        <div className="mt-10 mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <OwnerPageHead />

            <div className="flex justify-center mt-3">
                <span className="loading loading-spinner text-[#0a3d62] text-5xl"></span>
            </div>
        </div>
    )
}