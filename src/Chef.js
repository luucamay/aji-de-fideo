import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import moment from "moment"
import './Chef.css'

const usePendingPedidos = () => {
  const [pendingPedidos, setPendingPedidos] = useState([])
  useEffect(() => {
    //added variable unsubscribe
    const unsubscribe = firebase
      .firestore()
      .collection("pedidos")
      .where("status", "==", "sent")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        const listPendingPedidos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setPendingPedidos(listPendingPedidos)
      })
    //called the unsubscribe--closing connection to Firestore.
    return () => unsubscribe()
  }, [])
  return pendingPedidos
}

const pedidoReady = (pedidoId, timeSentKitchen) => {
  const db = firebase.firestore();
  const pedidoRef = db.collection("pedidos").doc(pedidoId);
  const timeReady = new Date();
  const msMinute = 60*1000, msDay = 60*60*24*1000;
  const preparationTime = Math.floor(((timeReady - timeSentKitchen.toDate()) % msDay) / msMinute);

  return pedidoRef.update({
    status: "ready",
    timeReady,
    preparationTime
  })
    .then(function () {
      console.log("Document successfully updated!");
      alert('Time pedido completed was: ' + preparationTime + ' mins');
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
    });
}

const PendingPedidoList = () => {
  const listPendingPedido = usePendingPedidos();
  const pendingPedidoCards = listPendingPedido.map(pendingPedido => {
    const hourArrived = moment(pendingPedido.timestamp.toDate()).format('LT');
    return (
      <div className="pedidoCard">
        <p>Client: <strong>{pendingPedido.clientName}</strong></p>
        <p>Hour arrived to kitchen: {hourArrived}</p>
        <h3>Pedido's detail</h3>
        <ul>
          {
            pendingPedido.pedidoList.map((product) => (<li>{product.name}</li>))
          }
        </ul>
        <button onClick={() => pedidoReady(pendingPedido.id, pendingPedido.timestamp)}>Ready to deliver</button>
      </div>
    )
  })
  return (
    <section className="pedidoCards" >
      <h2>Pedidos being prepared in kitchen</h2>
      {pendingPedidoCards}
    </section>
  )
};


function Chef() {
  return <PendingPedidoList />
}

export default Chef;