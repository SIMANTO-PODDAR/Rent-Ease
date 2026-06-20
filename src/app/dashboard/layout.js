import DashboardSidebar from "@/components/DashboardComponents/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-[90vh] bg-background">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />

        <div className="flex-1 overflow-y-auto">
          <div>

            {children}

          </div>
        </div>
      </div>
    </div>
  );
}
