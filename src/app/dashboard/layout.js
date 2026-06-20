import DashboardSidebar from "@/components/DashboardComponents/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-background">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />

        <div className="flex-1">
          <div className="mt-5 md:mt-0">

            {children}

          </div>
        </div>
      </div>
    </div>
  );
}
