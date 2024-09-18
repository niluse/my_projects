import React from "react";
import image from "../assets/nba-logo.png";

const Header = () => {
  return (
    <header>
      <img src={image} alt="nba logo" />
      <h1>NBA Legends</h1>
    </header>
  );
};

export default Header;
