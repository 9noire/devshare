import { useState } from 'react';

const tagOptions = [
  'Web Development',
  'AI',
  'Machine Learning',
  'Cyber Security',
  'DevOps',
  'Android',
  'Cloud',
  'Data Analyst',
  'IoT'
];

function SelectTags({ selectedTags, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onChange(newTags);
  };

  return (
    <div className="relative">
      <div
        className="w-full px-4 py-3 border border-gray-400 focus-within:border-black transition cursor-pointer flex flex-wrap gap-2 items-center min-h-[48px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTags.length === 0 ? (
          <span className="text-gray-500">Pilih tags...</span>
        ) : (
          selectedTags.map(tag => (
            <span
              key={tag}
              className="bg-black text-white px-3 py-1 text-sm rounded-full flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleTag(tag);
                }}
                className="ml-1 hover:bg-gray-800 w-5 h-5 flex items-center justify-center rounded-full"
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 border border-gray-400 bg-white z-10 shadow-lg max-h-60 overflow-y-auto">
          {tagOptions.map(tag => (
            <div
              key={tag}
              onClick={() => handleToggleTag(tag)}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                selectedTags.includes(tag) ? 'bg-gray-50' : ''
              }`}
            >
              <span>{tag}</span>
              {selectedTags.includes(tag) && (
                <span className="text-black font-bold">✓</span>
              )}
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name="tags" value={selectedTags.join(',')} />
    </div>
  );
}

export default SelectTags;