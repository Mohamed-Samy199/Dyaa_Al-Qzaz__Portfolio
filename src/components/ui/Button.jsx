const Button = ({ children, isLoading, className = "", ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`bg-mainColor hover:bg-mainColor/90 text-lightColor font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-50 border border-mainGold/30 ${className}`}
    >
      {isLoading ? "Saving..." : children}
    </button>
  );
};

export default Button;