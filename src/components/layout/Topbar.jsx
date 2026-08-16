import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout.js";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();

  return (
    <header className="h-16 flex items-center justify-end px-6 border-b border-gray-800">
      <button
        onClick={() => mutate(undefined, { onSettled: () => navigate("/login") })}
        disabled={isPending}
        className="text-sm text-gray-300 hover:text-mainGold transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;