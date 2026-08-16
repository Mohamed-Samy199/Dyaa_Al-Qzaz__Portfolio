const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-gray-900 border border-mainGold/20 rounded-xl p-6 ${className}`}>
      {title && <h2 className="text-lg font-bold text-lightColor mb-5">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;