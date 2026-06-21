import { verifyRole } from "@/lib/verifyRole";

const AdminLayout = async ({ children }) => {

    const res = await verifyRole('Admin')

    return children;
};

export default AdminLayout;