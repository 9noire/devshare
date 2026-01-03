function Textarea({ placeholder, value, onChange, name }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows="8"
      className="w-full px-4 py-3 border border-gray-400 focus:outline-none focus:border-black transition"
    />
  );
}

export default Textarea;