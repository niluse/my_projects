import React, { useState } from "react";
import image from "../assets/nba-logo.png";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.result);
    } catch (error) {
      console.error("Search error: ", error);
    }
  };

  return (
    <div>
      <img src={image} alt="nba logo" />
      <input
        type="text"
        placeholder="Search Players"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
