import React from 'react';
import './App.css';
import menu from './menu.json';
import Product from './Product';


function App() {
  const addProduct = (prodName, prodPrice) => {
    console.log(prodName, prodPrice);
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
    </div>
  );
}

export default App;
