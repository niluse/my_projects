import React from "react";

const PlayerCard = ({ name, img, statistic }) => {
  const { points, rebounds, assists, allStar } = statistic;
  console.log(statistic);

  return (
    <div>
      <div>
        <img src={img} alt={`${name}'s image`} />
        <h2>{name}</h2>
      </div>
      <div>
        <p>Points: {points}</p>
        <p>Rebounds: {rebounds}</p>
        <p>Assists: {assists}</p>
        <p>All-Star Appearances: {allStar}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
