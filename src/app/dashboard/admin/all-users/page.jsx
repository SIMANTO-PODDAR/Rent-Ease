import UsersTable from "@/components/AdminComponents/UsersTable";
import getUserToken from "@/lib/getUserToken";

const AllUsersPage = async () => {
    const userToken = await getUserToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-user`, {
        headers:
        {
            authorization: `Bearer ${userToken}`   // verifyUserToken
        }
    });
    const UsersData = await res.json();

    return (
        <div className="mt-10 max-w-4xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    User Management
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    Manage all registered users, update roles, and oversee account access across the platform.
                </p>
            </div>

            <UsersTable UsersData={UsersData} />

        </div>
    );
};

export default AllUsersPage;