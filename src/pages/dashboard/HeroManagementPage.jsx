import { useFormik } from "formik";
import * as Yup from "yup";
import { useHero } from "../../hooks/hero/useHero.js";
import { useUpdateHero } from "../../hooks/hero/useUpdateHero.js";
import { uploadFile } from "../../api/uploads.api.js";

import Card from "../../components/ui/Card.jsx";
import FormField from "../../components/ui/FormField.jsx";
import TextInput from "../../components/ui/TextInput.jsx";
import TextArea from "../../components/ui/TextArea.jsx";
import FileInput from "../../components/ui/FileInput.jsx";
import Toggle from "../../components/ui/Toggle.jsx";
import Button from "../../components/ui/Button.jsx";

const validationSchema = Yup.object({
  heroImage: Yup.string().url("Must be a valid URL").required("Hero image is required"),
  cvUrl: Yup.string().url("Must be a valid URL").required("CV is required"),
  showreelVideoUrl: Yup.string().url("Must be a valid URL").required("Showreel video is required"),
  badgeText: Yup.string().max(100),
  description: Yup.string().max(500),
});

const HeroManagementPage = () => {
  const { data: hero, isLoading } = useHero();
  const { mutate, isPending, error, isSuccess } = useUpdateHero();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heroImage: hero?.heroImage || "",
      cvUrl: hero?.cvUrl || "",
      showreelVideoUrl: hero?.showreelVideoUrl || "",
      isAvailable: hero?.isAvailable ?? true,
      badgeText: hero?.badgeText || "",
      description: hero?.description || "",
    },
    validationSchema,
    onSubmit: (values) => mutate(values),
  });

  const handleFileUpload = async (field, file) => {
    if (!file) return;
    const url = await uploadFile(file);
    formik.setFieldValue(field, url);
  };

  const serverError = error?.response?.data?.message;

  if (isLoading) {
    return <p className="text-gary-400">Loading...</p>;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lightColor">Hero Section</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage the content shown at the top of your homepage.
        </p>
      </div>

      {serverError && (
        <div className="mb-6 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
          {serverError}
        </div>
      )}

      {isSuccess && (
        <div className="mb-6 text-sm text-mainGold bg-mainColor/10 border border-mainGold/30 rounded-lg px-4 py-3">
          Hero section updated successfully.
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Card title="Media">
          <FormField label="Profile Image" error={formik.errors.heroImage}>
            <FileInput
              type="image"
              accept="image/*"
              previewUrl={formik.values.heroImage}
              onChange={(file) => handleFileUpload("heroImage", file)}
            />
          </FormField>

          <FormField label="CV File (PDF)" error={formik.errors.cvUrl}>
            <FileInput
              type="file"
              accept="application/pdf"
              previewUrl={formik.values.cvUrl}
              onChange={(file) => handleFileUpload("cvUrl", file)}
            />
          </FormField>

          <FormField label="Showreel Video" error={formik.errors.showreelVideoUrl}>
            <FileInput
              type="video"
              accept="video/*"
              previewUrl={formik.values.showreelVideoUrl}
              onChange={(file) => handleFileUpload("showreelVideoUrl", file)}
            />
          </FormField>
        </Card>

        <Card title="Status & Content">
          <FormField label="">
            <Toggle
              checked={formik.values.isAvailable}
              onChange={(val) => formik.setFieldValue("isAvailable", val)}
              label="Available for work"
            />
          </FormField>

          <FormField label="Badge Text" hint="Shown above your name, e.g. 'Top Rated Freelancer'">
            <TextInput
              name="badgeText"
              value={formik.values.badgeText}
              onChange={formik.handleChange}
              placeholder="Top Rated Freelancer"
            />
          </FormField>

          <FormField label="Description" error={formik.errors.description}>
            <TextArea
              name="description"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Transforming static ideas into dynamic visual experiences..."
            />
          </FormField>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroManagementPage;