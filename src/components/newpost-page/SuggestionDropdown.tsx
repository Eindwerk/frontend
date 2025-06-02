import React from "react";

interface SuggestionDropdownProps {
  suggestions: string[];
  onSelect: (value: string) => void;
}

const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <div className="suggestions">
      {suggestions.map((opt, idx) => (
        <div
          key={idx}
          className="suggestion-item"
          onClick={() => onSelect(opt)}
        >
          {opt}
        </div>
      ))}
    </div>
  );
};

export default SuggestionDropdown;
