import React, { useState } from 'react';
import { moneyToString, calcTotal } from './lib/util';
import menu from './menu.json';
import PedidoProduct from './PedidoProduct';
import Product from './Product';
import firebase from "./firebase";

function Waiter(props) {
  const [pedidoObj, setPedido] = useState({ "pedidoList": [], "total": 0 });

  const sendToKitchen = () => {
    // TO DO show modal to check order summary before send
    const clientName = document.createPedidoForm.clientName.value;
    if (pedidoObj.pedidoList.length > 0 && clientName.length > 0) {
      const firestore = firebase.firestore();
      firestore.collection("pedidos").add({
        ...pedidoObj,
        clientName,
        "status": "sent",
        "timestamp": firebase.firestore.FieldValue.serverTimestamp()
      }).then(successMessage, errorMessage);
    } else {
      alert("Please, add some products to the pedido or add clients name");
    }
  }

  const successMessage = (response) => {
    // create a dialog box
    alert('Pedido successfully sent');
    setPedido({ "pedidoList": [], "total": 0 });
    document.createPedidoForm.clientName.value = '';
  }
  const errorMessage = (err) => {
    alert(err.message);
  }

  const addProduct = (prodName, prodPrice) => {
    // goals: recibe a product, updates state of arrayOfProducts into the Pedido
    const newProduct = { id: pedidoObj.pedidoList.length + 1, name: prodName, price: prodPrice }
    // updatePedido();
    const pedidoList = [...pedidoObj.pedidoList, newProduct];
    const total = calcTotal(pedidoList);

    setPedido({ pedidoList, total });
  }

  const removeProduct = (prodId) => {
    const pedidoList = pedidoObj.pedidoList.filter(pedidoProduct => pedidoProduct.id !== prodId)
    const total = calcTotal(pedidoList);

    setPedido({ pedidoList, total });
  }

  const breakfastProducts = menu.breakfast.map((product) => <Product name={product.name} price={product.price} addProduct={addProduct} />);
  const pedidoProducts = pedidoObj.pedidoList.map((pedidoProd, index) => <PedidoProduct key={index} id={pedidoProd.id} name={pedidoProd.name} price={pedidoProd.price} removeProduct={removeProduct} />);
  const totalStr = moneyToString(pedidoObj.total);
  return (
    <div className="App">
      <section className="Menu">
        <h1>Breakfast</h1>
        <div className="Products">
          {breakfastProducts}
        </div>
      </section>
      <section className="Pedido">
        <form className="Client" name="createPedidoForm" >
          <label htmlFor="clientName">Client's Name</label>
          <input type="text" name="clientName"></input>
        </form>
        {pedidoProducts}
        <p>Total $ {totalStr}</p>
        <button onClick={sendToKitchen}>Enviar a cocina</button>
      </section>
    </div>
  );
}

export default Waiter