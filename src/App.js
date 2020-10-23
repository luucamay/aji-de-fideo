import React, { useState } from 'react';
import './App.css';
import menu from './menu.json';
import Pedido from './Pedido';
import Product from './Product';


function App() {
  const [pedidoList, setPedido] = useState([]);
  const addProduct = (prodName, prodPrice) => {
    // goals: recibe a product, updates state of arrayOfProducts into the Pedido
    const newProduct = { name: prodName, price: prodPrice }
    // updatePedido();
    const newPedido = [...pedidoList, newProduct];
    setPedido(newPedido);

  }
  const breakfastProducts = menu.breakfast.map((product) => <Product name={product.name} price={product.price} addProduct={addProduct} />);

  return (
    <div className="App">
      <section className="Menu">
        <h1>Breakfast</h1>
        <div className="Products">
          {breakfastProducts}
        </div>
      </section>
      <Pedido listProducts={pedidoList} />
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

export default App;

