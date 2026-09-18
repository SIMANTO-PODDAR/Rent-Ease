import ActivityMonitorClient from "@/components/AdminComponents/ActivityMonitor/ActivityMonitorClient";

export const metadata = {
    title: 'Activity Monitor | Admin Dashboard',
    description: 'Monitor current visitors, users, sessions, devices and page activity.',
}

const ActivityMonitorPage = () => {
    return (
        <div className="mt-10 max-w-7xl mx-auto px-4 pb-20">
            <div className="mb-8 text-center">
                <h2 className="text-4xl text-[#0a3d62] md:text-5xl font-bold mb-4 mt-5">
                    Activity Monitor
                </h2>
                <p className="text-[#0a3d62] max-w-xl mx-auto text-lg">
                    Monitor current visitors, users, sessions, devices and page activity.
                </p>
            </div>
            
            <ActivityMonitorClient />
        </div>
    );
};

export default ActivityMonitorPage;