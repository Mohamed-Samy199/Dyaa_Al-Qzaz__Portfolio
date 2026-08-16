import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { Trash2, Plus } from "lucide-react";
import { useAbout } from "../../hooks/about/useAbout.js";
import { useUpdateAbout } from "../../hooks/about/useUpdateAbout.js";
import { ICON_OPTIONS, getIconComponent } from "../../constants/icons.js";

import Card from "../../components/ui/Card.jsx";
import FormField from "../../components/ui/FormField.jsx";
import TextInput from "../../components/ui/TextInput.jsx";
import TextArea from "../../components/ui/TextArea.jsx";
import Select from "../../components/ui/Select.jsx";
import Button from "../../components/ui/Button.jsx";

const skillSchema = Yup.object({
  icon: Yup.string().required(),
  title: Yup.string().max(60).required("Title is required"),
  description: Yup.string().max(200).required("Description is required"),
});

const validationSchema = Yup.object({
  label: Yup.string().max(60),
  headingLine1: Yup.string().max(100),
  headingHighlight: Yup.string().max(100),
  bio: Yup.string().max(800).required("Bio is required"),
  skills: Yup.array().of(skillSchema).max(6),
});

const AboutManagementPage = () => {
  const { data: about, isLoading } = useAbout();
  const { mutate, isPending, error, isSuccess } = useUpdateAbout();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: about?.label || "",
      headingLine1: about?.headingLine1 || "",
      headingHighlight: about?.headingHighlight || "",
      bio: about?.bio || "",
      skills: about?.skills || [],
    },
    validationSchema,
    onSubmit: (values) => mutate(values),
  });

  const serverError = error?.response?.data?.message;

  if (isLoading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lightColor">About Section</h1>
        <p className="text-gray-400 text-sm mt-1">
          The photo used here is the same as your Hero photo — update it from the Hero Section page.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
          {serverError}
        </div>
      )}
      {isSuccess && (
        <div className="mb-6 text-sm text-mainGold bg-mainColor/10 border border-mainGold/30 rounded-lg px-4 py-3">
          About section updated successfully.
        </div>
      )}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Card title="Heading">
            <FormField label="Label" hint="Small label above the heading, e.g. 'Visual Origin Story'">
              <TextInput name="label" value={formik.values.label} onChange={formik.handleChange} />
            </FormField>

            <FormField label="Heading Line 1">
              <TextInput
                name="headingLine1"
                value={formik.values.headingLine1}
                onChange={formik.handleChange}
              />
            </FormField>

            <FormField label="Heading Highlight" hint="The colored/italic second line">
              <TextInput
                name="headingHighlight"
                value={formik.values.headingHighlight}
                onChange={formik.handleChange}
              />
            </FormField>
          </Card>

          <Card title="Bio">
            <FormField label="Bio Paragraph" error={formik.touched.bio && formik.errors.bio}>
              <TextArea
                name="bio"
                rows={5}
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormField>
          </Card>

          <Card title="Mini Skills Grid">
            <FieldArray name="skills">
              {({ push, remove }) => (
                <div className="space-y-5">
                  {formik.values.skills.map((skill, index) => {
                    const Icon = getIconComponent(skill.icon);
                    return (
                      <div
                        key={index}
                        className="border border-gray-800 rounded-lg p-4 relative"
                      >
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="flex items-center gap-2 mb-4 text-mainGold">
                          <Icon size={18} />
                          <span className="text-xs font-mono uppercase tracking-widest">
                            Card {index + 1}
                          </span>
                        </div>

                        <FormField label="Icon">
                          <Select
                            name={`skills.${index}.icon`}
                            value={skill.icon}
                            onChange={formik.handleChange}
                            className="text-black"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </Select>
                        </FormField>

                        <FormField label="Title">
                          <TextInput
                            name={`skills.${index}.title`}
                            value={skill.title}
                            onChange={formik.handleChange}
                          />
                        </FormField>

                        <FormField label="Description">
                          <TextArea
                            name={`skills.${index}.description`}
                            rows={2}
                            value={skill.description}
                            onChange={formik.handleChange}
                          />
                        </FormField>
                      </div>
                    );
                  })}

                  {formik.values.skills.length < 6 && (
                    <button
                      type="button"
                      onClick={() => push({ icon: "Zap", title: "", description: "" })}
                      className="flex items-center gap-2 text-sm text-mainGold hover:text-mainGold/80 transition"
                    >
                      <Plus size={16} /> Add Skill Card
                    </button>
                  )}
                </div>
              )}
            </FieldArray>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default AboutManagementPage;