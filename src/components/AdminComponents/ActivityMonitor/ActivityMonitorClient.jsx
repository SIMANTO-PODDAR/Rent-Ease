"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Search,
  RefreshCw,
  Activity,
  Users,
  Home,
  Shield,
  Monitor,
  Smartphone,
  Globe,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import SessionDetailDrawer from "./SessionDetailDrawer";
import Pagination from "@/components/Pagination";
import { CgSpinner } from "react-icons/cg";

const ActivityMonitorClient = () => {
  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination and filters
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedSession, setSelectedSession] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset page on search change
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchData = useCallback(
    async (isRefresh = false) => {
      // Avoid synchronous setState to fix React compiler error
      if (!isRefresh) {
        // Already true by default, but just in case for later pagination
        setTimeout(() => setLoading(true), 0);
      } else {
        setTimeout(() => setRefreshing(true), 0);
      }

      try {
        const { data: tokenData } = await authClient.token();
        const userToken = tokenData?.token;
        if (!userToken) return;

        const headers = { authorization: `Bearer ${userToken}` };

        // Fetch Stats
        const statsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/tracking-stats`,
          { headers }
        );
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch Sessions
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          role: roleFilter,
          status: statusFilter,
        });
        if (debouncedSearch) queryParams.append("search", debouncedSearch);

        const sessionsRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/tracking-sessions?${queryParams}`,
          { headers }
        );
        if (sessionsRes.ok) {
          const sessionsData = await sessionsRes.json();
          setSessions(sessionsData.sessions || []);
          setTotalPages(sessionsData.totalPages || 1);
          setTotalItems(
            sessionsData.totalItems ||
              (sessionsData.sessions
                ? (page - 1) * limit + sessionsData.sessions.length
                : 0)
          );

          // If a session is selected, update it with fresh data
          setSelectedSession((prev) => {
            if (prev) {
              const updatedSelected = (sessionsData.sessions || []).find(
                (s) => s.sessionId === prev.sessionId
              );
              if (updatedSelected) {
                return updatedSelected;
              }
            }
            return prev;
          });
        } else {
          if (!isRefresh) toast.error("Failed to fetch sessions");
        }
      } catch (error) {
        console.error("Tracking API Error:", error);
        if (!isRefresh)
          toast.error("An error occurred while fetching tracking data.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, limit, roleFilter, statusFilter, debouncedSearch]
  );

  // Initial load and dependency changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchDataRef = useRef(fetchData);

  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDataRef.current(true);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (session) => {
    setSelectedSession(session);
    setIsDrawerOpen(true);
  };

  const [now, setNow] = useState(() => Date.now());

  // Update 'now' every minute so relative times stay fresh without causing impure renders
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getRelativeTime = (timestamp) => {
    const diffMs = now - new Date(timestamp).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec} sec ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hr ago`;
    return `${Math.floor(diffHr / 24)} days ago`;
  };

  const renderStatusIndicator = (status, lastActiveAt) => {
    const isRecentlyActive = lastActiveAt
      ? now - new Date(lastActiveAt).getTime() < 1 * 60 * 1000
      : false;
    const isActive = isRecentlyActive;

    return (
      <div className="flex items-center gap-2">
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
    <div className="flex flex-col gap-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Now</p>
              <h3
                className={`${
                  stats ? "text-2xl" : "text-sm"
                } font-bold text-gray-800`}
              >
                {stats ? stats.activeNow : "Loading..."}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-gray-100 text-gray-600 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Guests</p>
              <h3
                className={`${
                  stats ? "text-2xl" : "text-sm"
                } font-bold text-gray-800`}
              >
                {stats ? stats.guests : "Loading..."}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Home size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Tenants</p>
              <h3
                className={`${
                  stats ? "text-2xl" : "text-sm"
                } font-bold text-gray-800`}
              >
                {stats ? stats.tenants : "Loading..."}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Owners</p>
              <h3
                className={`${
                  stats ? "text-2xl" : "text-sm"
                } font-bold text-gray-800`}
              >
                {stats ? stats.owners : "Loading..."}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-62.5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search IP, User ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-3 rounded-lg border-2 border-gray-100 bg-gray-50 hover:bg-gray-100 text-sm outline-none focus:border-gray-200 transition-colors w-full"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value || "All");
              setPage(1);
            }}
            className="h-10 px-3 rounded-lg border-2 border-gray-100 bg-gray-50 hover:bg-gray-100 text-sm outline-none focus:border-gray-200 transition-colors w-full md:w-37.5 appearance-none"
          >
            <option value="All">All Roles</option>
            <option value="Guest">Guest</option>
            <option value="Tenant">Tenant</option>
            <option value="Owner">Owner</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value || "All");
              setPage(1);
            }}
            className="h-10 px-3 rounded-lg border-2 border-gray-100 bg-gray-50 hover:bg-gray-100 text-sm outline-none focus:border-gray-200 transition-colors w-full md:w-37.5 appearance-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active Now</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {refreshing ? (
            <CgSpinner className="animate-spin" size={18} />
          ) : (
            <RefreshCw size={18} />
          )}
          Refresh
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
            <tr>
              <th className="px-4 py-3 font-medium">Visitor</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Current Page</th>
              <th className="px-4 py-3 font-medium">Device</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Last Active</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && !refreshing ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  <div className="flex justify-center items-center gap-2">
                    <CgSpinner className="animate-spin" size={24} /> Loading...
                  </div>
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No sessions found.
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr
                  key={session.sessionId || Math.random().toString()}
                  onClick={() => handleRowClick(session)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">
                      {session.role === "Guest"
                        ? `Guest #${session.visitorId
                            ?.substring(0, 6)
                            .toUpperCase()}`
                        : session.userInfo?.name ||
                          `User #${session.userId
                            ?.substring(0, 6)
                            .toUpperCase()}`}
                    </div>
                    {session.userInfo?.email && (
                      <div className="text-xs text-gray-500">
                        {session.userInfo.email}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        session.role === "Guest"
                          ? "bg-gray-100 text-gray-700"
                          : session.role === "Tenant"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {session.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="max-w-37.5 truncate text-sm"
                      title={session.currentPage}
                    >
                      {session.currentPage || "/"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {session.device?.deviceType === "Mobile" ? (
                        <Smartphone size={14} />
                      ) : (
                        <Monitor size={14} />
                      )}
                      <span
                        className="truncate max-w-20"
                        title={session.device?.browser}
                      >
                        {session.device?.browser || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Globe size={14} />
                      <span className="truncate max-w-25">
                        {session.geo?.city
                          ? `${session.geo.city}, ${session.geo.country}`
                          : "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock size={14} />
                      {getRelativeTime(session.lastActiveAt)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {renderStatusIndicator(
                      session.status,
                      session.lastActiveAt
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex w-full justify-center p-4 border-t border-gray-100">
            <Pagination
              pagination={{
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                limit: limit,
                itemLabel: "sessions",
              }}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>

      <SessionDetailDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        session={selectedSession}
      />
    </div>
  );
};

export default ActivityMonitorClient;
