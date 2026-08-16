import { useState } from "react";
import { useSkills } from "../../hooks/skills/useSkills.js";
import { useCreateSkill, useDeleteSkill } from "../../hooks/skills/useSkillMutations.js";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { getSkillIcon } from "../../constants/skillIcons.js";
import Button from "../../components/ui/Button.jsx";
import SkillCategoryForm from "../../components/skills/SkillCategoryForm.jsx";

const SkillsManagementPage = () => {
  const { data: skills, isLoading } = useSkills();
  const { mutate: createSkill, isPending: isCreating } = useCreateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();
  const [expandedId, setExpandedId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id) => {
    if (confirm("Delete this skill category? This cannot be undone.")) {
      deleteSkill(id);
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-lightColor">Skills</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your service categories and the work samples inside each one.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Add Category
          </span>
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-gray-900 border border-mainGold/20 rounded-xl p-6">
          <h3 className="text-lightColor font-bold mb-4">New Category</h3>
          <SkillCategoryForm
            defaultOrder={(skills?.length || 0) + 1}
            onSubmit={(values) =>
              createSkill(values, { onSuccess: () => setIsAdding(false) })
            }
            onCancel={() => setIsAdding(false)}
            isSubmitting={isCreating}
          />
        </div>
      )}

      <div className="space-y-3">
        {skills?.map((skill) => {
          const Icon = getSkillIcon(skill.icon);
          const isExpanded = expandedId === skill._id;

          return (
            <div
              key={skill._id}
              className="bg-gray-900 border border-mainGold/20 rounded-xl overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : skill._id)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-mainColor/20 rounded-lg text-mainGold">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-lightColor font-bold">{skill.heading}</p>
                    <p className="text-gray-500 text-xs">
                      {skill.works.length} work{skill.works.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(skill._id);
                    }}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-800 p-5">
                  <SkillCategoryForm skill={skill} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsManagementPage;