import UsersTable from "@/components/AdminComponents/UsersTable";
import Pagination from "@/components/Pagination";
import getUserToken from "@/lib/getUserToken";

const AllUsersPage = async ({ searchParams }) => {
    const params = await searchParams;
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;

    const userToken = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-user?page=${page}&limit=${limit}`, {
        headers:
        {
            authorization: `Bearer ${userToken}`   // verifyUserToken
        },
        cache: 'no-store'
    });
    const data = await res.json();

    let UsersData = [];
    let totalUsers = 0;
    let totalPages = 1;

    if (Array.isArray(data)) {
        totalUsers = data.length;
        totalPages = Math.ceil(totalUsers / limit) || 1;
        UsersData = data.slice((page - 1) * limit, page * limit);
    } else {
        UsersData = data.users || [];
        totalUsers = data.totalUsers || 0;
        totalPages = data.totalPages || 1;
    }

    const paginationData = {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalUsers,
        limit: limit,
        itemLabel: 'users'
    };

    return (
        <div className="mt-10 max-w-5xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    User Management
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    Manage all registered users, update roles, and oversee account access across the platform.
                </p>
            </div>

            <UsersTable UsersData={UsersData} currentPage={page} limit={limit} />

            <Pagination pagination={paginationData} />
        </div>
    );
};

export default AllUsersPage;