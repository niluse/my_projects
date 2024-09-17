import React, { useEffect, useState } from "react";
import image from "../assets/nba-logo.png";
import PlayerCard from "./PlayerCard";

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

  useEffect(() => {
    try {
      handleSearch();
    } catch (error) {
      console.error("error on loading data: ", error);
    }
  }, [searchTerm]);

  return (
    <div>
      <img src={image} alt="nba logo" />
      <input
        type="text"
        placeholder="Search Players"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.map((player) => (
        <PlayerCard
          key={player.id}
          name={player.name}
          img={player.img}
          statistic={player.statistic}
        />
      ))}
    </div>
  );
};

export default Header;
