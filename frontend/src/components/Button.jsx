function Button({ children, type = 'button', onClick, className = '', disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;