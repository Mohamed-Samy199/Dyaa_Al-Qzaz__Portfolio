const Toggle = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer w-fit">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-mainGold" : "bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span className="text-sm text-gray-200">{label}</span>
    </label>
  );
};

export default Toggle;