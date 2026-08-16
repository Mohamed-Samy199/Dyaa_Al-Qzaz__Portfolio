import { Link } from "react-router-dom";
import {
  User, Info, Layers, Film, Clapperboard, Star, ArrowRight, AlertCircle, CheckCircle2,
} from "lucide-react";

import { useHero } from "../../hooks/hero/useHero.js";
import { useAbout } from "../../hooks/about/useAbout.js";
import { useSkills } from "../../hooks/skills/useSkills.js";
import { useProjects } from "../../hooks/videos/useProjects.js";
import { useReels } from "../../hooks/reels/useReels.js";
import { useReviews } from "../../hooks/reviews/useReviews.js";

const StatCard = ({ icon: Icon, title, to, isReady, subtitle }) => (
  <Link
    to={to}
    className="group bg-gray-900 border border-mainGold/20 rounded-xl p-5 hover:border-mainGold/50 transition-colors flex flex-col justify-between"
  >
    <div className="flex items-start justify-between mb-6">
      <div className="p-3 bg-mainColor/20 rounded-lg text-mainGold">
        <Icon size={22} />
      </div>
      {isReady ? (
        <CheckCircle2 size={18} className="text-green-500" />
      ) : (
        <AlertCircle size={18} className="text-amber-500" />
      )}
    </div>

    <div>
      <h3 className="text-lightColor font-bold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>

    <div className="flex items-center gap-1 text-xs text-mainGold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
      Manage <ArrowRight size={12} />
    </div>
  </Link>
);

const DashboardHome = () => {
  const { data: hero, isLoading: heroLoading, isError: heroError } = useHero();
  const { data: about, isLoading: aboutLoading, isError: aboutError } = useAbout();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: reels, isLoading: reelsLoading } = useReels();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();

  const isLoading =
    heroLoading || aboutLoading || skillsLoading || projectsLoading || reelsLoading || reviewsLoading;

  if (isLoading) {
    return <p className="text-gray-400">Loading overview...</p>;
  }

  const stats = [
    {
      icon: User,
      title: "Hero Section",
      to: "/dashboard/hero",
      isReady: !heroError && !!hero,
      subtitle: hero
        ? `${hero.isAvailable ? "Available" : "Not available"} for work`
        : "Not configured yet",
    },
    {
      icon: Info,
      title: "About Section",
      to: "/dashboard/about",
      isReady: !aboutError && !!about,
      subtitle: about ? `${about.skills?.length || 0} skill cards` : "Not configured yet",
    },
    {
      icon: Layers,
      title: "Skills",
      to: "/dashboard/skills",
      isReady: (skills?.length || 0) > 0,
      subtitle: `${skills?.length || 0} categor${skills?.length === 1 ? "y" : "ies"}`,
    },
    {
      icon: Film,
      title: "Projects",
      to: "/dashboard/projects",
      isReady: (projects?.length || 0) > 0,
      subtitle: `${projects?.length || 0} project${projects?.length === 1 ? "" : "s"}`,
    },
    {
      icon: Clapperboard,
      title: "AI Generative Reels",
      to: "/dashboard/reels",
      isReady: (reels?.length || 0) > 0,
      subtitle: `${reels?.length || 0} reel${reels?.length === 1 ? "" : "s"}`,
    },
    {
      icon: Star,
      title: "Client Reviews",
      to: "/dashboard/reviews",
      isReady: (reviews?.length || 0) > 0,
      subtitle: `${reviews?.length || 0} review${reviews?.length === 1 ? "" : "s"}`,
    },
  ];

  const readyCount = stats.filter((s) => s.isReady).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lightColor">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          {readyCount} of {stats.length} sections have content published.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.to} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;