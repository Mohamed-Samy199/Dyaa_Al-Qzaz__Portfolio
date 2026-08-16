import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/auth/useMe.js";
import { authStore } from "../store/auth.store.js";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, isError } = useMe();

  if (!authStore.hasToken()) return <Navigate to="/login" replace />;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (isError || !user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;