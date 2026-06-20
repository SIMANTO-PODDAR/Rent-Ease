import { verifyRole } from "@/lib/verifyRole";

const OwnerLayout = async ({ children }) => {

    const res = await verifyRole('Owner')

    return children;
};

export default OwnerLayout;