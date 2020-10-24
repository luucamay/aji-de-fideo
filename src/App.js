import React, { useState } from 'react';
import './App.css';
import menu from './menu.json';
import PedidoProduct from './PedidoProduct';
import Product from './Product';


function App() {
  const [pedidoObj, setPedido] = useState({ "pedidoList": [], "total": 0, "totalStr": "0.00" });
  console.log([pedidoObj.pedidoList]);
  const addProduct = (prodName, prodPrice) => {
    // goals: recibe a product, updates state of arrayOfProducts into the Pedido
    const newProduct = { id: pedidoObj.pedidoList.length + 1, name: prodName, price: prodPrice }
    // updatePedido();
    const pedidoList = [...pedidoObj.pedidoList, newProduct];
    const total = calcTotal(pedidoList);
    const totalStr = moneyToString(total);
    setPedido({ pedidoList, total, totalStr });
  }
  const removeProduct = (prodId) => {
    const pedidoList = pedidoObj.pedidoList.filter(pedidoProduct => pedidoProduct.id !== prodId)
    const total = calcTotal(pedidoList);
    const totalStr = moneyToString(total);
    setPedido({ pedidoList, total, totalStr });
  }
  const breakfastProducts = menu.breakfast.map((product) => <Product name={product.name} price={product.price} addProduct={addProduct} />);
  const pedidoProducts = pedidoObj.pedidoList.map((pedidoProd, index) => <PedidoProduct key={index} id={pedidoProd.id} name={pedidoProd.name} price={pedidoProd.price} removeProduct={removeProduct} />);

  return (
    <div className="App">
      <section className="Menu">
        <h1>Breakfast</h1>
        <div className="Products">
          {breakfastProducts}
        </div>
      </section>
      <section className="Pedido">
        {pedidoProducts}
        <p>Total $ {pedidoObj.totalStr}</p>
        <button>Enviar a cocina</button>
      </section>
    </div>
  );
}

export function moneyToString(number) {
  if (number === 0) {
    return '0.00';
  }
  let moneyStr = number.toString();
  moneyStr = moneyStr.slice(0, -2) + '.' + moneyStr.slice(-2);
  return moneyStr;
}

const calcTotal = (products) => products.reduce((accumulator, currentValue) => (accumulator + currentValue.price), 0);

export default App;

