"use client";

import React, { useState, useEffect, useRef } from "react";
import SuggestionDropdown from "./SuggestionDropdown";
import { getAllGames } from "@/lib/actions/getAllGames";
import { Game } from "@/types/game";
import Text from "../ui/Text";

interface Props {
  onSelectGame: (gameId: number, stadiumId: number | null) => void;
}

const DetailContainer: React.FC<Props> = ({ onSelectGame }) => {
  const [titleInput, setTitleInput] = useState("");
  const [stadiumInput, setStadiumInput] = useState("");
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  const handleSelect = (game: Game) => {
    setTitleInput(
      `${game.home_team?.name ?? ""} - ${game.away_team?.name ?? ""}`
    );
    setStadiumInput(game.stadium?.name || "");
    setSuggestions([]);
    onSelectGame(game.id, game.stadium?.id ?? null);
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getAllGames();
      setAllGames(games);
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (titleInput.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allGames.filter((game) => {
      const matchTitle = `${game.home_team?.name ?? ""} - ${
        game.away_team?.name ?? ""
      }`;
      return matchTitle.toLowerCase().includes(titleInput.toLowerCase());
    });

    setSuggestions(filtered);
  }, [titleInput, allGames]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        titleRef.current &&
        !titleRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={titleRef} className="new-post-page__content__detail-container">
      <input
        className="title bold-blue-22"
        placeholder="Add Match Title"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <SuggestionDropdown suggestions={suggestions} onSelect={handleSelect} />
      )}
      <Text variant="subtext-spaceblue-12">{stadiumInput}</Text>
    </div>
  );
};

export default DetailContainer;
