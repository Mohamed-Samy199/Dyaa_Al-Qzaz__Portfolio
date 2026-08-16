import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useLogout } from "../../hooks/auth/useAuth.js";

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-neutral-800">
      <button onClick={onMenuClick} className="md:hidden text-neutral-300 hover:text-white">
        <Menu size={22} />
      </button>

      <div className="flex-1" />

      <button
        onClick={() => mutate(undefined, { onSettled: () => navigate("/login") })}
        disabled={isPending}
        className="text-sm text-neutral-300 hover:text-mainGold transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;