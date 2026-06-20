import { verifyRole } from "@/lib/verifyRole";

const tenantLayout = async ({ children }) => {

    const res = await verifyRole('Tenant')

    return children;
};

export default tenantLayout;