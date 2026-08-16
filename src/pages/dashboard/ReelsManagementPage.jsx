import { useState } from "react";
import { Plus, Trash2, Pencil, Film } from "lucide-react";
import { useReels } from "../../hooks/reels/useReels.js";
import {
  useCreateReel,
  useUpdateReel,
  useDeleteReel,
} from "../../hooks/reels/useReelMutations.js";
import Button from "../../components/ui/Button.jsx";
import ReelForm from "../../components/reels/ReelForm.jsx";

const ReelsManagementPage = () => {
  const { data: reels, isLoading } = useReels();
  const { mutate: createReel, isPending: isCreating } = useCreateReel();
  const { mutate: updateReel, isPending: isUpdating } = useUpdateReel();
  const { mutate: deleteReel } = useDeleteReel();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Delete this reel? This cannot be undone.")) {
      deleteReel(id);
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-lightColor">AI Generative Reels</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the cinematic AI-generated video reels shown on the site.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Add Reel
          </span>
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-gray-900 border border-mainGold/20 rounded-xl p-6">
          <h3 className="text-lightColor font-bold mb-4">New Reel</h3>
          <ReelForm
            defaultOrder={(reels?.length || 0) + 1}
            onSubmit={(values) =>
              createReel(values, { onSuccess: () => setIsAdding(false) })
            }
            onCancel={() => setIsAdding(false)}
            isSubmitting={isCreating}
          />
        </div>
      )}

      <div className="space-y-3">
        {reels?.map((reel) => {
          const isEditing = editingId === reel._id;

          return (
            <div
              key={reel._id}
              className="bg-gray-900 border border-mainGold/20 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-mainColor/20 flex items-center justify-center text-mainGold shrink-0">
                    <Film size={20} />
                  </div>
                  <div>
                    <p className="text-lightColor font-bold">{reel.title}</p>
                    <p className="text-gray-500 text-xs">
                      REEL_{String(reel.order).padStart(2, "0")} • {reel.category} • {reel.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingId(isEditing ? null : reel._id)}
                    className="text-gray-500 hover:text-mainGold transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(reel._id)}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="border-t border-gray-800 p-5">
                  <ReelForm
                    reel={reel}
                    isSubmitting={isUpdating}
                    onSubmit={(values) =>
                      updateReel(
                        { id: reel._id, payload: values },
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

export default ReelsManagementPage;