import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import DashboardHome from "../pages/dashboard/DashboardHome.jsx";
import Home from "../pages/home/home.jsx";
import HeroManagementPage from "../pages/dashboard/HeroManagementPage.jsx";
import AboutManagementPage from "../pages/dashboard/AboutManagementPage.jsx";
import SkillsManagementPage from "../pages/dashboard/SkillsManagementPage.jsx";
import VideosManagementPage from "../pages/dashboard/VideosManagementPage.jsx";
import ReelsManagementPage from "../pages/dashboard/ReelsManagementPage.jsx";
import ReviewsManagementPage from "../pages/dashboard/ReviewsManagementPage.jsx";
import ScrollToTopButton from "../components/shared/ScrollToTopButton/ScrollToTopButton.jsx";


const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="hero" element={<HeroManagementPage />} />
          <Route path="about" element={<AboutManagementPage />} />
          <Route path="skills" element={<SkillsManagementPage />} />
          <Route path="projects" element={<VideosManagementPage />} />
          <Route path="reels" element={<ReelsManagementPage />} />
          <Route path="reviews" element={<ReviewsManagementPage />} />
        </Route>

      </Routes>
      <ScrollToTopButton />
    </>
  );
};

export default AppRoutes;