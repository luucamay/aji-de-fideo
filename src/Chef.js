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

const PendingPedidoList = () => {
  const listPendingPedido = usePendingPedidos();
  const pendingPedidoCards = listPendingPedido.map(pendingPedido => {
    const hourSend = moment(pendingPedido.timestamp.toDate()).format('LT');
    return (
      <div className="pedidoCard">
        <p>Client: <strong>{pendingPedido.clientName}</strong></p>
        <p>Hour: {hourSend}</p>
        <h3>Pedido's detail</h3>
        <ul>
          {
            pendingPedido.pedidoList.map((product) => (<li>{product.name}</li>))
          }
        </ul>
        <button>Ready to deliver</button>
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