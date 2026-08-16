import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { uploadFile } from "../../api/uploads.api.js";

import FormField from "../ui/FormField.jsx";
import TextInput from "../ui/TextInput.jsx";
import FileInput from "../ui/FileInput.jsx";
import Button from "../ui/Button.jsx";

const validationSchema = Yup.object({
  order: Yup.number().required(),
  title: Yup.string().max(150).required("Title is required"),
  category: Yup.string().max(100).required("AI model/source is required"),
  videoUrl: Yup.string().url("Upload a video").required("Video is required"),
  duration: Yup.string().max(10).required("Duration is required"),
});

const ReelForm = ({ reel, defaultOrder, onSubmit, onCancel, isSubmitting }) => {
  const isEditMode = !!reel;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order: reel?.order ?? defaultOrder ?? 1,
      title: reel?.title || "",
      category: reel?.category || "",
      videoUrl: reel?.videoUrl || "",
      duration: reel?.duration || "",
    },
    validationSchema,
    onSubmit,
  });

  const handleVideoUpload = async (file) => {
    const url = await uploadFile(file);
    formik.setFieldValue("videoUrl", url);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Order">
            <TextInput
              type="number"
              name="order"
              value={formik.values.order}
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField label="Duration" hint="e.g. 0:34">
            <TextInput name="duration" value={formik.values.duration} onChange={formik.handleChange} />
          </FormField>
        </div>

        <FormField label="Title" error={formik.touched.title && formik.errors.title}>
          <TextInput
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormField>

        <FormField
          label="AI Model / Source"
          hint="e.g. Runway Gen-2, Stable Diffusion, Sora AI"
          error={formik.touched.category && formik.errors.category}
        >
          <TextInput
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormField>

        <FormField label="Video" error={formik.errors.videoUrl}>
          <FileInput
            type="video"
            accept="video/*"
            previewUrl={formik.values.videoUrl}
            onChange={handleVideoUpload}
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
            {isEditMode ? "Save Changes" : "Add Reel"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ReelForm;