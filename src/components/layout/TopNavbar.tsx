import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { useSidebarStore } from "@/stores/sidebarStore";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/flights": "Flights & Routes",
  "/bookings": "Bookings",
  "/passengers": "Passengers",
  "/finance": "Finance",
  "/accounting": "Accounting",
  "/promos": "Promos & Vouchers",
  "/campaigns": "Campaigns",
  "/corporate": "Corporate Portal",
  "/group-booking": "Group Booking",
  "/users": "User Management",
  "/analytics": "Analytics & Reporting",
};

export function TopNavbar() {
  const location = useLocation();
  const { toggleMobile } = useSidebarStore();

  const currentPage = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-[#F6F8FA]/90 px-4 backdrop-blur-md md:px-8">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={toggleMobile}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm"
        >
          <Icon icon="solar:hamburger-menu-linear" width={24} />
        </button>
        <span className="text-lg font-bold text-slate-900">BookMyTix</span>
      </div>

      {/* Breadcrumb */}
      <div className="hidden items-center gap-2 md:flex">
        <span className="text-sm font-medium text-slate-400">
          Admin Console
        </span>
        <Icon icon="solar:alt-arrow-right-linear" className="text-slate-300" />
        <span className="text-sm font-medium text-slate-900">
          {currentPage}
        </span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            width={20}
          />
          <input
            type="text"
            placeholder="Global search..."
            className="h-11 w-64 rounded-2xl border-none bg-white pl-10 pr-4 text-sm font-medium text-slate-600 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] outline-none ring-1 ring-slate-100 transition-shadow focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        {/* Notifications */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] ring-1 ring-slate-100 transition-all hover:text-slate-900 hover:shadow-md">
          <Icon icon="solar:bell-linear" width={22} />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
