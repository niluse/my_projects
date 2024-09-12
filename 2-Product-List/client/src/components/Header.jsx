import React from "react";

const Header = ({ fetchProducts }) => {
  return (
    <div className="header">
      <header> Lily's </header>
      <div className="header-list">
        <div className="header-list-item" onClick={() => fetchProducts("all")}>
          All
        </div>
        <div
          className="header-list-item"
          onClick={() => fetchProducts("electronics")}>
          Electronics
        </div>
        <div
          className="header-list-item"
          onClick={() => fetchProducts("men's clothing")}>
          Men's Clothing
        </div>
        <div
          className="header-list-item"
          onClick={() => fetchProducts("women's clothing")}>
          Women's Clothing
        </div>
        <div
          className="header-list-item"
          onClick={() => fetchProducts("jewelery")}>
          Jewelry
        </div>
      </div>
    </div>
  );
};

export default Header;
