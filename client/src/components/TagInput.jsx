import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const TagInput = ({ tags, setTags, maxTags = 4 }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Tags populaires (comme dev.to)
  const popularTags = [
    'javascript', 'react', 'nodejs', 'python', 'webdev', 'programming',
    'tutorial', 'beginners', 'css', 'html', 'vue', 'angular', 'typescript',
    'devops', 'docker', 'aws', 'git', 'opensource', 'career', 'productivity'
  ];

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = popularTags
        .filter(tag => 
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(tag)
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, tags]);

  const addTag = (tag) => {
    const cleanTag = tag.trim().toLowerCase().replace(/\s+/g, '');
    if (cleanTag && !tags.includes(cleanTag) && tags.length < maxTags) {
      setTags([...tags, cleanTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSuggestionClick = (tag) => {
    addTag(tag);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="border border-gray-300 rounded-md p-3 min-h-[50px] focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-500 hover:text-gray-700 ml-1"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={tags.length === 0 ? "Ajouter jusqu'à 4 tags..." : ""}
          disabled={tags.length >= maxTags}
          className="w-full outline-none bg-transparent placeholder-gray-400 disabled:cursor-not-allowed"
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {suggestions.map((tag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(tag)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <span className="text-gray-600">#</span>
              <span className="font-medium">{tag}</span>
            </button>
          ))}
        </div>
      )}

      {/* Helper text */}
      <div className="mt-2 text-sm text-gray-500">
        {tags.length}/{maxTags} tags • Appuyez sur Entrée ou virgule pour ajouter
      </div>
    </div>
  );
};

export default TagInput;