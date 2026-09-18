import { authClient } from "./auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const getTrackingIds = () => {
  if (typeof window === "undefined") return { sessionId: null, visitorId: null };

  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }

  let sessionId = sessionStorage.getItem("sessionId");
  let lastActive = sessionStorage.getItem("sessionLastActive");
  const now = Date.now();

  // Expire after 30 minutes of inactivity
  if (sessionId && lastActive && (now - parseInt(lastActive, 10) > 30 * 60 * 1000)) {
    sessionId = null;
  }

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("sessionId", sessionId);
  }
  
  sessionStorage.setItem("sessionLastActive", now.toString());

  return { sessionId, visitorId };
};

const getAuthHeaders = async () => {
  try {
    const { data: tokenData } = await authClient.token();
    const userToken = tokenData?.token;
    if (userToken) {
      return { authorization: `Bearer ${userToken}` };
    }
  } catch (error) {
    // Ignore error if not logged in
  }
  return {};
};

export const trackSessionUpdate = async (entryPage, currentPage) => {
  try {
    const { sessionId, visitorId } = getTrackingIds();
    if (!sessionId || !visitorId) return;

    const headers = await getAuthHeaders();

    await fetch(`${API_BASE_URL}/track/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        sessionId,
        visitorId,
        entryPage,
        currentPage,
      }),
    });
  } catch (error) {
    // console.error("Session tracking failed", error);
  }
};

export const trackEvent = async (type, metadata = {}) => {
  try {
    const { sessionId, visitorId } = getTrackingIds();
    if (!sessionId || !visitorId) return;

    const headers = await getAuthHeaders();

    await fetch(`${API_BASE_URL}/track/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        sessionId,
        visitorId,
        type,
        metadata,
      }),
    });
  } catch (error) {
    // console.error("Event tracking failed", error);
  }
};
