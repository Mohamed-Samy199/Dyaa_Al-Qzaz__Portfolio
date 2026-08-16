import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { Plus, Trash2 } from "lucide-react";
import { useUpdateSkill } from "../../hooks/skills/useSkillMutations.js";
import { uploadFile } from "../../api/uploads.api.js";
import { SKILL_ICON_OPTIONS } from "../../constants/skillIcons.js";

import FormField from "../ui/FormField.jsx";
import TextInput from "../ui/TextInput.jsx";
import Select from "../ui/Select.jsx";
import FileInput from "../ui/FileInput.jsx";
import Button from "../ui/Button.jsx";

const workSchema = Yup.object({
  title: Yup.string().max(150).required("Title is required"),
  thumbnail: Yup.string().url("Upload a thumbnail").required("Thumbnail is required"),
  videoUrl: Yup.string().url("Must be a valid URL").nullable(),
  videoFile: Yup.string().url().nullable(),
});

const validationSchema = Yup.object({
  order: Yup.number().required(),
  label: Yup.string().max(60).required("Label is required"),
  heading: Yup.string().max(60).required("Heading is required"),
  icon: Yup.string().required(),
  works: Yup.array().of(workSchema),
});

const SkillCategoryForm = ({ skill, defaultOrder, onSubmit, onCancel, isSubmitting }) => {
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkill();
  const isEditMode = !!skill;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order: skill?.order ?? defaultOrder ?? 1,
      label: skill?.label || "",
      heading: skill?.heading || "",
      icon: skill?.icon || "Layers",
      works: skill?.works || [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEditMode) {
        updateSkill({ id: skill._id, payload: values });
      } else {
        onSubmit(values);
      }
    },
  });

  const handleThumbnailUpload = async (index, file) => {
    const url = await uploadFile(file);
    formik.setFieldValue(`works.${index}.thumbnail`, url);
  };

  const handleVideoUpload = async (index, file) => {
    const url = await uploadFile(file);
    formik.setFieldValue(`works.${index}.videoFile`, url);
    formik.setFieldValue(`works.${index}.videoUrl`, "");
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <FormField label="Order">
            <TextInput
              type="number"
              name="order"
              value={formik.values.order}
              onChange={formik.handleChange}
            />
          </FormField>
          <FormField label="Icon">
            <Select name="icon" value={formik.values.icon} onChange={formik.handleChange}>
              {SKILL_ICON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Label" hint="Vertical side text, e.g. 'MOTION GRAPHICS'">
            <TextInput name="label" value={formik.values.label} onChange={formik.handleChange} />
          </FormField>
        </div>

        <FormField label="Heading" hint="Main title shown when opened, e.g. 'Motion Graphics'">
          <TextInput name="heading" value={formik.values.heading} onChange={formik.handleChange} />
        </FormField>

        <div>
          <h4 className="text-lightColor font-bold mb-3">Works</h4>
          <FieldArray name="works">
            {({ push, remove }) => (
              <div className="space-y-4">
                {formik.values.works.map((work, index) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-lg p-4 relative space-y-4"
                  >
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <FormField label="Title">
                      <TextInput
                        name={`works.${index}.title`}
                        value={work.title}
                        onChange={formik.handleChange}
                      />
                    </FormField>

                    <FormField label="Thumbnail">
                      <FileInput
                        type="image"
                        accept="image/*"
                        previewUrl={work.thumbnail}
                        onChange={(file) => handleThumbnailUpload(index, file)}
                      />
                    </FormField>

                    <FormField
                      label="External Video Link"
                      hint="Use this OR upload a video file below, not both"
                    >
                      <TextInput
                        name={`works.${index}.videoUrl`}
                        value={work.videoUrl || ""}
                        onChange={(e) => {
                          formik.setFieldValue(`works.${index}.videoUrl`, e.target.value);
                          if (e.target.value) {
                            formik.setFieldValue(`works.${index}.videoFile`, "");
                          }
                        }}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </FormField>

                    <FormField label="Or Upload Video File">
                      <FileInput
                        type="video"
                        accept="video/*"
                        previewUrl={work.videoFile}
                        onChange={(file) => handleVideoUpload(index, file)}
                      />
                    </FormField>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => push({ title: "", thumbnail: "", videoUrl: "", videoFile: "" })}
                  className="flex items-center gap-2 text-sm text-mainGold hover:text-mainGold/80 transition"
                >
                  <Plus size={16} /> Add Work
                </button>
              </div>
            )}
          </FieldArray>
        </div>

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
          <Button type="submit" isLoading={isSubmitting || isUpdating}>
            {isEditMode ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default SkillCategoryForm;