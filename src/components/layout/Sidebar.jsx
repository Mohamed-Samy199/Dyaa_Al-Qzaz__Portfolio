import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/hero", label: "Hero Section" },
  { to: "/dashboard/about", label: "About Section" },
  { to: "/dashboard/skills", label: "Skills" },
  { to: "/dashboard/projects", label: "Projects" },
  { to: "/dashboard/reels", label: "AI Generative Reels" },
  { to: "/dashboard/reviews", label: "Client Reviews" },
  { to: "/dashboard/settings", label: "Account Settings" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop — موبايل بس، بيظهر لما الـ sidebar مفتوح */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 shrink-0 bg-gray-950 border-r border-gray-800 p-4 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-white font-bold text-lg">
            Dyaa <span className="text-mainGold">Dashboard</span>
          </h2>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? "bg-mainColor/30 text-mainGold border border-mainGold/40"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;