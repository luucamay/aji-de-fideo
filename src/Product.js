import React from 'react';
import './Product.css';
import { moneyToString } from './lib/util';

function Product(props) {
  const priceStr = moneyToString(props.price);
  return (
    <div className="product">
      <h3>{props.name}</h3>
      <p>$ {priceStr}</p>
      <button onClick={() => props.addProduct(props.name, props.price)}>Add</button>
    </div>
  )
}

export default Product