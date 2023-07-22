import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import OrdersViewer from "./OrdersViewer";

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
firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <div>
      <OrdersViewer />
    </div>
  );
};

export default App;
