import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Star } from "lucide-react";
import { uploadFile } from "../../api/uploads.api.js";

import FormField from "../ui/FormField.jsx";
import TextInput from "../ui/TextInput.jsx";
import FileInput from "../ui/FileInput.jsx";
import Button from "../ui/Button.jsx";

const validationSchema = Yup.object({
  order: Yup.number().required(),
  image: Yup.string().url("Upload a screenshot").required("Screenshot is required"),
  alt: Yup.string().max(200).required("Alt text is required"),
  platform: Yup.string().max(50).required("Platform is required"),
  rating: Yup.number().min(1).max(5).required(),
});

const ReviewForm = ({ review, defaultOrder, onSubmit, onCancel, isSubmitting }) => {
  const isEditMode = !!review;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order: review?.order ?? defaultOrder ?? 1,
      image: review?.image || "",
      alt: review?.alt || "",
      platform: review?.platform || "",
      rating: review?.rating ?? 5,
    },
    validationSchema,
    onSubmit,
  });

  const handleImageUpload = async (file) => {
    const url = await uploadFile(file);
    formik.setFieldValue("image", url);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <FormField label="Order">
            <TextInput
              type="number"
              name="order"
              value={formik.values.order}
              onChange={formik.handleChange}
            />
          </FormField>

          <FormField label="Platform" hint="e.g. مستقل, خمسات, Upwork, Fiverr">
            <TextInput
              name="platform"
              value={formik.values.platform}
              onChange={formik.handleChange}
            />
          </FormField>

          <FormField label="Rating">
            <div className="flex items-center gap-1 pt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => formik.setFieldValue("rating", n)}
                  className="transition"
                >
                  <Star
                    size={22}
                    className={
                      n <= formik.values.rating
                        ? "text-mainGold fill-mainGold"
                        : "text-gray-600"
                    }
                  />
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <FormField
          label="Alt Text"
          hint="Short description for accessibility, e.g. 'Client review on مستقل - 5 stars'"
          error={formik.touched.alt && formik.errors.alt}
        >
          <TextInput
            name="alt"
            value={formik.values.alt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormField>

        <FormField label="Review Screenshot" error={formik.errors.image}>
          <FileInput
            type="image"
            accept="image/*"
            previewUrl={formik.values.image}
            onChange={handleImageUpload}
          />
        </FormField>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-sm text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
          )}
          <Button type="submit" isLoading={isSubmitting}>
            {isEditMode ? "Save Changes" : "Add Review"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ReviewForm;