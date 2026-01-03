import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name, 
  className = '', 
  autoFocus = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`w-full px-4 py-3 pr-12 border border-gray-400 focus:outline-none focus:border-black transition rounded-md ${className}`}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition"
          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.5} />
          ) : (
            <Eye size={20} strokeWidth={1.5} />
          )}
        </button>
      )}
    </div>
  );
}

export default Input;