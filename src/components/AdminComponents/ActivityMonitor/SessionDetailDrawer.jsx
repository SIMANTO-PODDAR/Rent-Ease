"use client";
import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Modal, Spinner } from "@heroui/react";
import {
  Smartphone,
  Clock,
  Navigation,
  History,
  Link as LinkIcon,
} from "lucide-react";

const SessionDetailDrawer = ({ isOpen, onOpenChange, session }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tracking");

  const fetchActivities = useCallback(async () => {
    setTimeout(() => setLoading(true), 0);
    try {
      const { data: tokenData } = await authClient.token();
      const userToken = tokenData?.token;
      if (!userToken) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/tracking-activities/${session.sessionId}`,
        {
          headers: { authorization: `Bearer ${userToken}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (error) {
      console.error("Failed to fetch activities", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (isOpen && session?.sessionId) {
      fetchActivities();
    }
  }, [isOpen, session, fetchActivities]);

  if (!session) return null;

  const formatDuration = (ms) => {
    if (!ms) return "0s";
    const sec = Math.floor(ms / 1000);
    if (sec < 60) return `${sec}s`;
    const min = Math.floor(sec / 60);
    const remSec = sec % 60;
    if (min < 60) return `${min}m ${remSec}s`;
    const hr = Math.floor(min / 60);
    const remMin = min % 60;
    return `${hr}h ${remMin}m`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  const formatTimeOnly = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(dateStr));
  };

  const getStatusIndicator = () => {
    const isActive = session.status === "active";
    return (
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isActive ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
        <span
          className={`text-sm ${
            isActive ? "text-green-700 font-medium" : "text-gray-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container placement="right">
          <Modal.Dialog className="h-full m-0 sm:max-w-2xl fixed right-0 top-0 bottom-0 bg-white rounded-l-2xl flex flex-col shadow-xl">
            <Modal.CloseTrigger className="absolute right-4 top-4 z-50 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-colors" />
            <Modal.Header className="flex flex-col gap-1 p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-center w-full pr-8">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">
                    {session.role === "Guest" ? "Guest Visitor" : session.role}
                  </h2>
                  <span className="text-gray-400 text-sm font-normal">
                    #{session.visitorId?.substring(0, 8).toUpperCase()}
                  </span>
                </div>
                {getStatusIndicator()}
              </div>
              <div className="text-sm text-gray-500 font-normal mt-1 flex items-center gap-1.5">
                <LinkIcon size={14} /> Currently on:{" "}
                <span className="font-medium text-gray-700">
                  {session.currentPage || "/"}
                </span>
              </div>
            </Modal.Header>
            <Modal.Body className="gap-8 p-6 overflow-y-auto">
              {/* Top Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Session Info */}
                <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                  <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Clock size={16} /> Session Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Started At</span>
                      <span className="font-medium">
                        {formatDate(session.startedAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">
                        {formatDuration(session.sessionDurationMs)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Active</span>
                      <span className="font-medium">
                        {formatDate(session.lastActiveAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Page Views</span>
                      <span className="font-medium">
                        {session.pageViewCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Identity & Device */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Smartphone size={16} /> Device & Network
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">IP Address</span>
                      <span className="font-medium">
                        {session.ipAddress || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium">
                        {session.geo?.city
                          ? `${session.geo.city}, ${session.geo.country}`
                          : "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Device</span>
                      <span className="font-medium">
                        {session.device?.deviceType || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Browser/OS</span>
                      <span className="font-medium">
                        {session.device?.browser || "Unknown"} /{" "}
                        {session.device?.os || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Profile (If applicable) */}
              {session.userInfo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    User Identity
                  </h3>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-1">
                    <div className="text-sm">
                      <span className="text-gray-500 w-24 inline-block">
                        Name:
                      </span>
                      <span className="font-medium text-gray-900">
                        {session.userInfo.name}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500 w-24 inline-block">
                        Email:
                      </span>
                      <span className="font-medium text-gray-900">
                        {session.userInfo.email}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500 w-24 inline-block">
                        User ID:
                      </span>
                      <span className="font-medium font-mono text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-600">
                        {session.userId}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabs for Tracking & Journey */}
              <div className="mt-2 flex flex-col">
                <div className="flex border-b border-gray-200 mb-6 shrink-0">
                  <button
                    onClick={() => setActiveTab("tracking")}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === "tracking"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <History size={16} /> Tracking Activities
                  </button>
                  <button
                    onClick={() => setActiveTab("journey")}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
                      activeTab === "journey"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Navigation size={16} /> Page Journey
                  </button>
                </div>

                {activeTab === "tracking" && (
                  <div className="animate-in fade-in duration-300">
                    {loading ? (
                      <div className="flex justify-center p-8">
                        <Spinner />
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-1 border border-gray-100">
                        {activities.length > 0 ? (
                          <div className="space-y-1">
                            {activities.map((activity, idx) => (
                              <div
                                key={idx}
                                className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex gap-4 items-start"
                              >
                                <div className="text-xs font-mono text-gray-400 mt-0.5 whitespace-nowrap w-16">
                                  {formatTimeOnly(activity.createdAt)}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-800 capitalize">
                                    {activity.type.replace(/_/g, " ")}
                                  </div>
                                  {Object.keys(activity.metadata || {}).length >
                                    0 && (
                                    <div className="mt-1.5 text-xs text-gray-600 space-y-1">
                                      {Object.entries(activity.metadata).map(
                                        ([k, v]) => (
                                          <div key={k} className="flex gap-2">
                                            <span className="text-gray-400">
                                              {k}:
                                            </span>
                                            <span className="font-medium">
                                              {typeof v === "object"
                                                ? JSON.stringify(v)
                                                : String(v)}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-gray-500 text-sm bg-white rounded-lg">
                            No specific activities recorded during this session.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "journey" && (
                  <div className="animate-in fade-in duration-300">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      {(session.routeHistory || []).map((route, idx) => (
                        <div
                          key={idx}
                          className="flex group border-b border-gray-100 last:border-0 relative"
                        >
                          {/* Timeline Line */}
                          {idx !== session.routeHistory?.length - 1 && (
                            <div className="absolute left-6 top-8 bottom-0 w-px bg-gray-200 z-0 group-hover:bg-blue-300 transition-colors"></div>
                          )}

                          <div className="py-4 pl-4 pr-3 shrink-0 relative z-10 bg-white">
                            <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white mt-1"></div>
                          </div>

                          <div className="py-3 pr-4 grow">
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-medium text-gray-800 break-all">
                                {route.path}
                              </div>
                              <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded whitespace-nowrap ml-4">
                                {formatTimeOnly(route.enteredAt)}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1.5">
                              <Clock size={14} className="text-gray-400" />
                              {route.durationMs > 0
                                ? formatDuration(route.durationMs)
                                : "Currently viewing"}
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!session.routeHistory ||
                        session.routeHistory.length === 0) && (
                        <div className="p-6 text-center text-gray-500 text-sm">
                          No page journey data available.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default SessionDetailDrawer;
