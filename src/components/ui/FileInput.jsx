import { useState } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

const FileInput = ({ accept, onChange, previewUrl, type = "image" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = async (file) => {
    if (!file) return;
    setUploadError(null);
    setIsUploading(true);
    try {
      await onChange(file);
    } catch (err) {
      setUploadError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {previewUrl && type === "image" && (
        <img
          src={previewUrl}
          alt="preview"
          className="w-32 h-32 object-cover rounded-lg mb-3 border border-mainGold/30"
        />
      )}
      {previewUrl && type === "video" && (
        <video
          src={previewUrl}
          controls
          className="w-full max-w-xs rounded-lg mb-3 border border-mainGold/30"
        />
      )}
      {previewUrl && type === "file" && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-mainGold text-sm underline mb-3 w-fit"
        >
          <FileText size={16} /> View current file
        </a>
      )}

      <label
        className={`flex items-center gap-2 w-fit cursor-pointer text-lightColor text-sm font-medium px-4 py-2.5 rounded-lg transition border border-mainGold/20 ${
          isUploading ? "bg-gray-700 cursor-not-allowed" : "bg-mainColor hover:bg-mainColor/80"
        }`}
      >
        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
        {isUploading ? "Uploading..." : "Choose File"}
        <input
          type="file"
          accept={accept}
          disabled={isUploading}
          onChange={(e) => handleChange(e.target.files[0])}
          className="hidden"
        />
      </label>

      {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
    </div>
  );
};

export default FileInput;