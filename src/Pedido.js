import React, { useState } from 'react';
import './Pedido.css';
import { moneyToString } from './App';

function Pedido(props) {
  // TODO: Change numbers to strings with dots for decimals
  const productsArray = props.listProducts;
  let total = 0;
  const products = productsArray.map(
    (product) => {
      total += product.price;
      const priceStr = moneyToString(product.price);
      return (<div>{product.name} {priceStr} <button>Remove</button></div>);
    });
  const totalStr = moneyToString(total);
  return (
    <section className="Pedido">
      {products}
      <p>Total $ {totalStr}</p>
      <button>Enviar a cocina</button>
    </section>
  )
}

export default Pedido