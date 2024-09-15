import React, { useState } from "react";
import image from "../assets/nba-logo.png";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <img src={image} alt="nba logo" />
    </div>
  );
};

export default Header;
