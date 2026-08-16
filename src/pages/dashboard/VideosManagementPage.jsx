import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useProjects } from "../../hooks/videos/useProjects.js";
import {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../../hooks/videos/useProjectMutations.js";
import Button from "../../components/ui/Button.jsx";
import ProjectForm from "../../components/videos/ProjectForm.jsx";

const VideosManagementPage = () => {
  const { data: projects, isLoading } = useProjects();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Delete this project? This cannot be undone.")) {
      deleteProject(id);
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-lightColor">Videos</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the project cards shown in the Latest Projects carousel.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Add Project
          </span>
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-gray-900 border border-mainGold/20 rounded-xl p-6">
          <h3 className="text-lightColor font-bold mb-4">New Project</h3>
          <ProjectForm
            defaultOrder={(projects?.length || 0) + 1}
            onSubmit={(values) =>
              createProject(values, { onSuccess: () => setIsAdding(false) })
            }
            onCancel={() => setIsAdding(false)}
            isSubmitting={isCreating}
          />
        </div>
      )}

      <div className="space-y-3">
        {projects?.map((project) => {
          const isEditing = editingId === project._id;

          return (
            <div
              key={project._id}
              className="bg-gray-900 border border-mainGold/20 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-800"
                  />
                  <div>
                    <p className="text-lightColor font-bold">{project.title}</p>
                    <p className="text-gray-500 text-xs">
                      {project.category} • {project.year}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingId(isEditing ? null : project._id)}
                    className="text-gray-500 hover:text-mainGold transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="border-t border-gray-800 p-5">
                  <ProjectForm
                    project={project}
                    isSubmitting={isUpdating}
                    onSubmit={(values) =>
                      updateProject(
                        { id: project._id, payload: values },
                        { onSuccess: () => setEditingId(null) }
                      )
                    }
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideosManagementPage;