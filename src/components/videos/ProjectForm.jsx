import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { Plus, X } from "lucide-react";
import { uploadFile } from "../../api/uploads.api.js";

import FormField from "../ui/FormField.jsx";
import TextInput from "../ui/TextInput.jsx";
import FileInput from "../ui/FileInput.jsx";
import Button from "../ui/Button.jsx";

const validationSchema = Yup.object({
  order: Yup.number().required(),
  title: Yup.string().max(150).required("Title is required"),
  category: Yup.string().max(100).required("Category is required"),
  image: Yup.string().url("Upload a thumbnail").required("Thumbnail is required"),
  video: Yup.string().url("Upload a video").required("Video is required"),
  year: Yup.string().max(4).required("Year is required"),
  tags: Yup.array().of(Yup.string().max(30)).max(6),
});

const ProjectForm = ({ project, defaultOrder, onSubmit, onCancel, isSubmitting }) => {
  const isEditMode = !!project;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order: project?.order ?? defaultOrder ?? 1,
      title: project?.title || "",
      category: project?.category || "",
      image: project?.image || "",
      video: project?.video || "",
      tags: project?.tags || [],
      year: project?.year || String(new Date().getFullYear()),
    },
    validationSchema,
    onSubmit,
  });

  const handleImageUpload = async (file) => {
    const url = await uploadFile(file);
    formik.setFieldValue("image", url);
  };

  const handleVideoUpload = async (file) => {
    const url = await uploadFile(file);
    formik.setFieldValue("video", url);
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
          <FormField label="Year">
            <TextInput name="year" value={formik.values.year} onChange={formik.handleChange} />
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
          label="Category"
          hint="e.g. 'Graphic Design / Motion', 'After Effects / 3D'"
          error={formik.touched.category && formik.errors.category}
        >
          <TextInput
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormField>

        <FormField label="Thumbnail Image" error={formik.errors.image}>
          <FileInput
            type="image"
            accept="image/*"
            previewUrl={formik.values.image}
            onChange={handleImageUpload}
          />
        </FormField>

        <FormField label="Video" error={formik.errors.video}>
          <FileInput
            type="video"
            accept="video/*"
            previewUrl={formik.values.video}
            onChange={handleVideoUpload}
          />
        </FormField>

        <FormField label="Tags" hint="e.g. After Effects, Premiere, Illustrator">
          <FieldArray name="tags">
            {({ push, remove }) => (
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formik.values.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-full"
                    >
                      {tag}
                      <button type="button" onClick={() => remove(i)}>
                        <X size={12} className="hover:text-red-400" />
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const tag = prompt("Tag name:");
                    if (tag) push(tag);
                  }}
                  className="flex items-center gap-2 text-sm text-mainGold hover:text-mainGold/80 transition"
                >
                  <Plus size={16} /> Add Tag
                </button>
              </div>
            )}
          </FieldArray>
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
            {isEditMode ? "Save Changes" : "Add Project"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ProjectForm;