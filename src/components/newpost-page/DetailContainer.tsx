"use client";

// TODO: Remove the matchData and implement the real api call

import React, { useState, useRef, useEffect } from "react";
import { matchOptions } from "./matchData";
import SuggestionDropdown from "./SuggestionDropdown";

const DetailContainer: React.FC = () => {
  const [titleInput, setTitleInput] = useState("");
  const [stadiumInput, setStadiumInput] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [stadiumSuggestions, setStadiumSuggestions] = useState<string[]>([]);

  const titleRef = useRef<HTMLDivElement>(null);
  const stadiumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = matchOptions.filter((opt) =>
      opt.title.toLowerCase().includes(titleInput.toLowerCase())
    );
    setTitleSuggestions(
      titleInput.trim() === "" ? [] : filtered.map((m) => m.title)
    );
  }, [titleInput]);

  useEffect(() => {
    const uniqueStadiums = Array.from(
      new Set(matchOptions.map((m) => m.stadium))
    );
    const filtered = uniqueStadiums.filter((opt) =>
      opt.toLowerCase().includes(stadiumInput.toLowerCase())
    );
    setStadiumSuggestions(stadiumInput.trim() === "" ? [] : filtered);
  }, [stadiumInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        titleRef.current &&
        !titleRef.current.contains(event.target as Node)
      ) {
        setTitleSuggestions([]);
      }
      if (
        stadiumRef.current &&
        !stadiumRef.current.contains(event.target as Node)
      ) {
        setStadiumSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="new-post-page__detail-container">
      {/* Title */}
      <div ref={titleRef} style={{ position: "relative", width: "100%" }}>
        <input
          className="title bold-blue-22"
          placeholder="Add Match Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          autoComplete="off"
        />
        {titleSuggestions.length > 0 && (
          <SuggestionDropdown
            suggestions={titleSuggestions}
            onSelect={(selectedTitle) => {
              setTitleInput(selectedTitle);
              const match = matchOptions.find((m) => m.title === selectedTitle);
              if (match) setStadiumInput(match.stadium);
              setTitleSuggestions([]);
            }}
          />
        )}
      </div>

      {/* Stadium */}
      <div ref={stadiumRef} style={{ position: "relative", width: "100%" }}>
        <input
          className="stadium subtext-spaceblue-12"
          placeholder="Add Stadium"
          value={stadiumInput}
          onChange={(e) => setStadiumInput(e.target.value)}
          autoComplete="off"
        />
        {stadiumSuggestions.length > 0 && (
          <SuggestionDropdown
            suggestions={stadiumSuggestions}
            onSelect={(selectedStadium) => {
              setStadiumInput(selectedStadium);
              setStadiumSuggestions([]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailContainer;
