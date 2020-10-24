import React, { useState } from 'react';
import './Pedido.css';
import { moneyToString } from './App';

function PedidoProduct(props) {
  const priceStr = moneyToString(props.price);
  return (<div>{props.name} {priceStr} <button onClick={() => props.removeProduct(props.id)}>Remove</button></div>);
}

export default PedidoProduct