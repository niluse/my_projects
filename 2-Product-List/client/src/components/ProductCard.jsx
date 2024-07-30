import React from 'react'

const ProductCard = ({ id,category, description, image, price, title }) => {
  return (
    <div className="product-card" key = {id}>
        <img src={image} alt={title} />
        <div className="product-detials">
        <h2>{title}</h2>
        <p>{price}</p>
        </div>
    </div>
  )
}

export default ProductCard