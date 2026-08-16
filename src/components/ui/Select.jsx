const Select = ({ children, className = "", ...props }) => {
  return (
    <select
      {...props}
      className={`w-full rounded-lg bg-gray-800 border border-gray-700 text-lightColor px-4 py-2.5 focus:outline-none focus:border-mainGold focus:ring-1 focus:ring-mainGold/50 transition ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;