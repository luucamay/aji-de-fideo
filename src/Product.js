import React from 'react';
import './Product.css';

function Product(props) {
  let priceStr = props.price.toString();
  priceStr = priceStr.slice(0, -2) + '.' + priceStr.slice(-2);
  return (
    <div className="product">
      <h3>{props.name}</h3>
      <p>$ {priceStr}</p>
      <button onClick={() => props.addProduct(props.name, props.price)}>Add</button>
    </div>
  )
}

export default Product