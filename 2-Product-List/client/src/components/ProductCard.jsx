import React from 'react'

const ProductCard = ({ id, image, price, title }) => {
  return (
    <div className="product-card">
        <img src={image} alt={title} />
        <div className="product-price">
          <p>{price} $</p>
        </div>
        <div className="product-title">
          <h2>{title}</h2>
        </div>
    </div>
  )
}

export default ProductCard