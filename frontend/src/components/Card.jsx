function Card({ children, className = '' }) {
  return (
    <div className={`border border-gray-300 p-6 bg-white ${className}`}>
      {children}
    </div>
  );
}

export default Card;