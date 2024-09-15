import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const Homepage = () => {
  const [backendData, setBackendData] = useState([]);
  const { category } = useParams(); // Get the category from the URL
  const navigate = useNavigate();

  const fetchProducts = (category) => {
    const url =
      category === "all"
        ? "http://127.0.0.1:8000"
        : `http://127.0.0.1:8000/category/${category}`;

    // console.log("Fetching products from URL: ", url); // URL'yi konsolda kontrol et

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

  // Trigger fetch when category changes in the URL
  useEffect(() => {
    fetchProducts(category || "all");
  }, [category]);

  const handleCategoryClick = (selectedCategory) => {
    // Navigate to the new URL when a category is clicked
    navigate(`/${selectedCategory}`);
  };

  return (
    <div>
      <Header fetchProducts={handleCategoryClick} />
      <div className="container">
        {backendData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          backendData.map((data) => <ProductCard {...data} key={data.id} />)
        )}
      </div>
    </div>
  );
};

export default Homepage;
