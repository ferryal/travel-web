import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useUserStore } from "@/stores/userStore";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "solar:widget-2-linear",
    path: "/",
  },
  {
    id: "flights",
    label: "Flights & Routes",
    icon: "solar:route-linear",
    path: "/flights",
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: "solar:ticket-linear",
    path: "/bookings",
    badge: 8,
  },
  {
    id: "passengers",
    label: "Passengers",
    icon: "solar:users-group-rounded-linear",
    path: "/passengers",
  },
];

const financeItems: NavItem[] = [
  {
    id: "finance",
    label: "Finance",
    icon: "solar:wallet-linear",
    path: "/finance",
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: "solar:calculator-linear",
    path: "/accounting",
  },
];

const b2bItems: NavItem[] = [
  {
    id: "corporate",
    label: "Corporate",
    icon: "solar:buildings-2-linear",
    path: "/corporate",
  },
  {
    id: "group-booking",
    label: "Group Booking",
    icon: "solar:users-group-two-rounded-linear",
    path: "/group-booking",
  },
];

const marketingItems: NavItem[] = [
  {
    id: "promos",
    label: "Promos & Vouchers",
    icon: "solar:ticket-sale-linear",
    path: "/promos",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: "solar:target-linear",
    path: "/campaigns",
  },
];

const systemItems: NavItem[] = [
  {
    id: "users",
    label: "Users",
    icon: "solar:user-id-linear",
    path: "/users",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "solar:chart-linear",
    path: "/analytics",
  },
];

interface NavSectionProps {
  items: NavItem[];
  label?: string;
  isActive: (path: string) => boolean;
  closeMobile: () => void;
}

function NavSection({ items, label, isActive, closeMobile }: NavSectionProps) {
  return (
    <>
      {label && (
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-300 lg:px-4">
          {label}
        </p>
      )}
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          onClick={closeMobile}
          className={`
            group flex items-center gap-3 rounded-2xl px-3 py-3 font-medium transition-all lg:px-4
            ${
              isActive(item.path)
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
            }
          `}
        >
          <Icon
            icon={item.icon}
            width={22}
            className={
              !isActive(item.path)
                ? "transition-colors group-hover:text-slate-900"
                : ""
            }
          />
          <span className="md:hidden lg:block">{item.label}</span>
          {item.badge && (
            <span className="ml-auto h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-50 px-1.5 text-[10px] font-bold text-primary-600 md:hidden lg:flex">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { isMobileOpen, closeMobile } = useSidebarStore();
  const { user } = useUserStore();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-100 bg-white py-8 px-6
          transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:w-20 lg:w-72 lg:px-6
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo - Plane icon only */}
        <div className="mb-10 flex w-full items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-200">
            <Icon icon="solar:plane-bold" width={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 md:hidden lg:block">
            BookMyTix
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto hide-scroll">
          <NavSection
            items={navItems}
            isActive={isActive}
            closeMobile={closeMobile}
          />

          {/* Divider */}
          <div className="my-3 border-t border-slate-100 lg:mx-4" />

          {/* Finance Section */}
          <NavSection
            items={financeItems}
            label="Finance"
            isActive={isActive}
            closeMobile={closeMobile}
          />

          {/* Divider */}
          <div className="my-3 border-t border-slate-100 lg:mx-4" />

          {/* B2B Section */}
          <NavSection
            items={b2bItems}
            label="B2B"
            isActive={isActive}
            closeMobile={closeMobile}
          />

          {/* Divider */}
          <div className="my-3 border-t border-slate-100 lg:mx-4" />

          {/* Marketing Section */}
          <NavSection
            items={marketingItems}
            label="Marketing"
            isActive={isActive}
            closeMobile={closeMobile}
          />

          {/* Divider */}
          <div className="my-3 border-t border-slate-100 lg:mx-4" />

          {/* System Section */}
          <NavSection
            items={systemItems}
            label="System"
            isActive={isActive}
            closeMobile={closeMobile}
          />
        </nav>

        {/* User Profile */}
        {user && (
          <div className="mt-auto rounded-2xl bg-slate-50 p-4 md:hidden lg:block">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
              />
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900">
                  {user.name}
                </span>
                <span className="text-xs text-slate-400">{user.role}</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
