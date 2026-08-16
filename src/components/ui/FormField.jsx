const FormField = ({ label, error, children, hint }) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-200 mb-2">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-gray-500 text-xs mt-1.5">{hint}</p>}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
};

export default FormField;