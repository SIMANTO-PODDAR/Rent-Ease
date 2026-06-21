import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import {
  CalendarDays, Heart, User, LayoutDashboard, PlusSquare,
  Building2, ClipboardList, Users, CalendarCheck, CreditCard,
  Settings, Menu
} from "lucide-react";

export default async function DashboardSidebar() {

  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  const user = userSession?.user;
  const role = user?.role || "Tenant";

  // Role-based navigation links 
  const dashboardLinks = {
    Tenant: [
      {
        group: "MAIN",
        items: [
          { icon: CalendarDays, label: "My Bookings", link: "/dashboard/tenant/my-bookings" },
          { icon: Heart, label: "Favorites", link: "/dashboard/tenant/my-favorites" },
        ]
      },
      {
        group: "ACCOUNT",
        items: [
          { icon: User, label: "Profile", link: "/dashboard/tenant" },
        ]
      }
    ],
    Owner: [
      {
        group: "PROPERTY MANAGEMENT",
        items: [
          { icon: LayoutDashboard, label: "Analytics", link: "/dashboard/owner" },
          { icon: PlusSquare, label: "Add Property", link: "/dashboard/owner/add-property" },
          { icon: Building2, label: "My Properties", link: "/dashboard/owner/owner-properties" },
          { icon: ClipboardList, label: "Booking Requests", link: "/dashboard/owner/booking-requests" },
        ]
      },
      {
        group: "ACCOUNT",
        items: [
          { icon: User, label: "Profile", link: "/dashboard/owner/profile" },
        ]
      }
    ],
    Admin: [
      {
        group: "MANAGEMENT",
        items: [
          { icon: Users, label: "All Users", link: "/dashboard/admin/all-users" },
          { icon: Building2, label: "All Properties", link: "/dashboard/admin/all-properties" },
          { icon: CalendarCheck, label: "All Bookings", link: "/dashboard/admin/all-bookings" },
          { icon: CreditCard, label: "Transactions", link: "/dashboard/admin/transactions" },
        ]
      },
      {
        group: "ACCOUNT",
        items: [
          { icon: User, label: "Profile", link: "/dashboard/admin" },
        ]
      }
    ],
  };

  const SidebarGroups = dashboardLinks[role] || dashboardLinks.Tenant;

  // Reusable Sidebar View
  const SidebarContent = (
    <div className="flex h-[85vh] flex-col justify-between">
      <div className="flex flex-col gap-6">

        {/* User Card */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-3 backdrop-blur shadow-xs">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <User className="size-5" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-semibold text-slate-800">
              {user?.name || "User Account"}
            </span>
            <span className="mt-0.5 inline-flex w-fit items-center rounded-full bg-[#3498db]/10 px-2 py-0.5 text-xs font-semibold text-[#3498db]">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-6">
          {SidebarGroups.map((group) => (
            <div key={group.group}>
              <h2 className="mb-2 px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                {group.group}
              </h2>
              <nav className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <Link key={item.label} href={item.link} className="block outline-none">
                    <button
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:translate-x-1"
                      type="button"
                    >
                      <item.icon className="size-5 text-slate-400 transition-colors group-hover:text-[#0a3d62]" />
                      <span className="transition-colors group-hover:text-slate-900">
                        {item.label}
                      </span>
                    </button>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-slate-100 pt-4 mt-6 space-y-2">
        <button className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
          <Settings className="size-5 text-slate-400" />
          Settings
        </button>
      </div>
    </div>
  );

  return (
    <Drawer>
      {/* Mobile Trigger Button */}
      <div className="relative">

        <Button
          className="absolute top-1 left-1 z-50 flex sm:hidden items-center gap-2 rounded-xl bg-linear-to-r from-[#0a3d62] to-[#3498db] text-white shadow-md font-medium scale-80"
        >
          <Menu className="size-5" />
          Menu
        </Button>
      </div>


      {/* Desktop Inline Sidebar */}
      <div className="hidden sm:flex flex-col w-70 shrink-0 border-r border-slate-200 bg-white p-4 min-h-screen">
        {SidebarContent}
      </div>

      {/* Mobile Drawer Content */}
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog className="w-70 p-5 overflow-hidden bg-white h-full">
            <Drawer.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600" />
            <div className="pt-6 h-full">
              {SidebarContent}
            </div>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}