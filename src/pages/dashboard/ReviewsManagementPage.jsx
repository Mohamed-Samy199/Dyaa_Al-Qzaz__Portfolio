import { useState } from "react";
import { Plus, Trash2, Pencil, Star } from "lucide-react";
import { useReviews } from "../../hooks/reviews/useReviews.js";
import {
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "../../hooks/reviews/useReviewMutations.js";
import Button from "../../components/ui/Button.jsx";
import ReviewForm from "../../components/reviews/ReviewForm.jsx";

const ReviewsManagementPage = () => {
  const { data: reviews, isLoading } = useReviews();
  const { mutate: createReview, isPending: isCreating } = useCreateReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
  const { mutate: deleteReview } = useDeleteReview();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Delete this review? This cannot be undone.")) {
      deleteReview(id);
    }
  };

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-lightColor">Client Reviews</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage the testimonial screenshots shown in the reviews marquee.
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Add Review
          </span>
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-gray-900 border border-mainGold/20 rounded-xl p-6">
          <h3 className="text-lightColor font-bold mb-4">New Review</h3>
          <ReviewForm
            defaultOrder={(reviews?.length || 0) + 1}
            onSubmit={(values) =>
              createReview(values, { onSuccess: () => setIsAdding(false) })
            }
            onCancel={() => setIsAdding(false)}
            isSubmitting={isCreating}
          />
        </div>
      )}

      <div className="space-y-3">
        {reviews?.map((review) => {
          const isEditing = editingId === review._id;

          return (
            <div
              key={review._id}
              className="bg-gray-900 border border-mainGold/20 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.alt}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-800"
                  />
                  <div>
                    <p className="text-lightColor font-bold">{review.platform}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-mainGold fill-mainGold" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEditingId(isEditing ? null : review._id)}
                    className="text-gray-500 hover:text-mainGold transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="border-t border-gray-800 p-5">
                  <ReviewForm
                    review={review}
                    isSubmitting={isUpdating}
                    onSubmit={(values) =>
                      updateReview(
                        { id: review._id, payload: values },
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

export default ReviewsManagementPage;