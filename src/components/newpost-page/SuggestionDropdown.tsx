"use client";

import { Game } from "@/types/game";
import React from "react";

interface SuggestionDropdownProps {
  suggestions: Game[];
  onSelect: (game: Game) => void;
}

const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <div className="suggestions title-suggestions">
      {suggestions.map((game) => (
        <div
          key={game.id}
          className="suggestion-item"
          onClick={() => onSelect(game)}
        >
          {game.home_team.name} vs {game.away_team.name}
        </div>
      ))}
    </div>
  );
};

export default SuggestionDropdown;
