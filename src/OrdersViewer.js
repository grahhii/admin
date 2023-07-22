import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./OrdersViewer.css";

// Ваша конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgW7aq9KKx59APJOAbRj_3sBrl-eAaJps",
  authDomain: "azmanot-c5dc8.firebaseapp.com",
  databaseURL:
    "https://azmanot-c5dc8-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "azmanot-c5dc8",
  storageBucket: "azmanot-c5dc8.appspot.com",
  messagingSenderId: "231622403612",
  appId: "1:231622403612:web:4d775ae7d648ee95a161d9",
};

// Инициализация Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const OrdersViewer = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Получаем данные из базы данных при загрузке компонента
    const ordersRef = firebase.database().ref("orders");
    ordersRef.on("value", (snapshot) => {
      const ordersData = snapshot.val();
      if (ordersData) {
        // Преобразуем данные из объекта в массив заказов
        const ordersArray = Object.keys(ordersData).map((orderId) => ({
          id: orderId,
          ...ordersData[orderId],
        }));
        setOrders(ordersArray);
      } else {
        setOrders([]); // Добавляем пустой массив, если данных нет
      }
    });

    // Отписываемся от обновлений базы данных при размонтировании компонента
    return () => ordersRef.off("value");
  }, []);

  const handleDeleteOrder = (orderId) => {
    // Удаляем заказ из базы данных по его ID
    const orderRef = firebase.database().ref(`orders/${orderId}`);
    orderRef.remove();
  };

  return (
    <div className="orders-container">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order">
            <h3 className="order-title">{order.customerName.toUpperCase()}</h3>
            {Array.isArray(order.items) ? (
              order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <p className="p-count">{item.count}</p>
                  <p className="p-title">{item.title}</p>
                </div>
              ))
            ) : (
              <p>אין כלום בהזמנה</p>
            )}
            <button
              className="delete-button"
              onClick={() => handleDeleteOrder(order.id)}
            >
              להסיר
            </button>
          </div>
        ))
      ) : (
        <p>אין הזמנות</p>
      )}
    </div>
  );
};

export default OrdersViewer;
