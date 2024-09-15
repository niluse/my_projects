import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";

const Homepage = () => {
  const [backendData, setBackendData] = useState([]);

  const url = "http://127.0.0.1:8000";

  const fetchPlayers = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && Array.isArray(data.result.rows)) {
          setBackendData(data.result.rows);
        } else {
          console.log("unexpected data format: ", data);
        }
      })
      .catch((error) => {
        console.error("there was a problem with the fetch operation: ", error);
      });
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  console.log(backendData);
  return (
    <div>
      <Header />
      <CardContainer />
    </div>
  );
};

export default Homepage;
