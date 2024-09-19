import React, { useState } from "react";

const PlayerCard = ({ name, img, statistic }) => {
  const { points, rebounds, assists, allStar } = statistic;
  const [clicked, setCliked] = useState(false);

  const handleClick = () => {
    setCliked(!clicked);
  };

  return (
    <div className="player-card">
      <div
        className={clicked ? "image invisible" : "image visible"}
        onClick={handleClick}>
        <img src={img} alt={`${name}'s image`} />
        <h2>{name}</h2>
      </div>
      <div className={clicked ? "visible" : "invisible"} onClick={handleClick}>
        <p>🏀 Points: {points}</p>
        <p>🏀 Rebounds: {rebounds}</p>
        <p>🏀 Assists: {assists}</p>
        <p>🏀 All-Star Appearances: {allStar}</p>
        {console.log(clicked)}
      </div>
    </div>
  );
};

export default PlayerCard;
