import AllPropertiesTable from "@/components/AdminComponents/AllPropertiesTable";
import Pagination from "@/components/Pagination";
import getUserToken from "@/lib/getUserToken";

const AllPropertiesPage = async ({ searchParams }) => {
    const params = await searchParams;
    const page = params?.page || 1;
    const limit = 10;

    const userToken = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-properties/admin?page=${page}&limit=${limit}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`      // verifyUserToken
        }
    });

    const data = await res.json();
    const AllProperties = data.properties || [];

    const paginationData = {
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        totalItems: data.totalProperties || 0,
        limit: limit
    };

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

            <AllPropertiesTable AllProperties={AllProperties} />

            <Pagination pagination={paginationData} />

        </div>
    );
};

export default AllPropertiesPage;