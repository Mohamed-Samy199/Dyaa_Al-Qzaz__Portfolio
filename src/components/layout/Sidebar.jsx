import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/hero", label: "Hero Section" },
  { to: "/dashboard/about", label: "About Section" },
  { to: "/dashboard/skills", label: "Skills" },
  { to: "/dashboard/projects", label: "Projects" },
  { to: "/dashboard/reels", label: "AI Generative Reels" },
  { to: "/dashboard/reviews", label: "Client Reviews" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0 bg-gray-950 border-r border-gray-800 min-h-screen p-4">
      <div className="mb-8 px-2">
        <h2 className="text-white font-bold text-lg">
          Dyaa <span className="text-mainGold">Dashboard</span>
        </h2>

      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition ${isActive
                ? "bg-mainColor/30 text-mainGold border border-mainGold/40"
                : "text-mainGold hover:text-white hover:bg-gray-900"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;