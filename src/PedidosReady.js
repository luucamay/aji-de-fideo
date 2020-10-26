import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import moment from "moment"
import './Chef.css'

const useReadyPedidos = () => {
  const [readyPedidos, setReadyPedidos] = useState([])
  useEffect(() => {
    //added variable unsubscribe
    const unsubscribe = firebase
      .firestore()
      .collection("pedidos")
      .where("status", "==", "ready")
      .orderBy("timeReady")
      .onSnapshot(snapshot => {
        const listReadyPedidos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setReadyPedidos(listReadyPedidos)
      })
    //called the unsubscribe--closing connection to Firestore.
    return () => unsubscribe()
  }, [])
  return readyPedidos
}

const pedidoDelivered = (pedidoId) => {
  const db = firebase.firestore();
  const pedidoRef = db.collection("pedidos").doc(pedidoId);
  const timeDelivered = new Date();

  return pedidoRef.update({
    status: "delivered",
    timeDelivered
  })
    .then(function () {
      console.log("Pedido changed status to delivered");
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
}

const ReadyPedidoList = () => {
  const listReadyPedido = useReadyPedidos();
  const readyPedidoCards = listReadyPedido.map(readyPedido => {
    const hourSent = moment(readyPedido.timestamp.toDate()).format('LT');
    const hourReady = moment(readyPedido.timeReady.toDate()).format('LT');
    const prepTime = readyPedido.preparationTime;
    return (
      <div className="pedidoCard">
        <p>Client: <strong>{readyPedido.clientName}</strong></p>
        <p>Hour pedido sent to kitchen: {hourSent}</p>
        <p>Hour pedido completed in kitchen: {hourReady}</p>
        <p>Preparation Time: {prepTime} mins</p>
        <h3>Pedido's detail</h3>
        <ul>
          {
            readyPedido.pedidoList.map((product) => (<li>{product.name}</li>))
          }
        </ul>
        <button onClick={() => pedidoDelivered(readyPedido.id)}>Delivered</button>
      </div>
    )
  })
  return (
    <section className="pedidoCards" >
      <h2>Pedidos being prepared in kitchen</h2>
      {readyPedidoCards}
    </section>
  )
};

export default ReadyPedidoList;