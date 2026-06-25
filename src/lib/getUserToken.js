import { headers } from "next/headers";
import { auth } from "./auth";

const getUserToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return token || null;
};

export default getUserToken;