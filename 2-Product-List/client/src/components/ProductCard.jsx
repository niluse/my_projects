import React, { useState } from 'react';

const ProductCard = ({ id, image, price, title }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleTitleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <div className="product-price">
        <p>{price} $</p>
      </div>
      <div 
        className={`product-title ${isClicked ? 'expanded' : ''}`}
        onClick={handleTitleClick}
        title={title}
      >
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
