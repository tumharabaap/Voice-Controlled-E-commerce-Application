import React from "react";

import { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    alanBtn({
      key: "e1f632d08c63f22aa36df33cca36f0692e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setMenuItems(commandData.data);
        } else if (commandData.command === "addToCart") {
          addToCart(commandData.data);
        }
      },
    });
  }, []);

  const addToCart = (menuItem) => {
    setCart((oldCart) => {
      return [...oldCart, menuItem];
    });
  };

  return (
    <div className="App">
      {menuItems.map((menuItem) => (
        <li key={menuItem.name}>
          {menuItem.name} - ₹{menuItem.price} - {menuItem.category}
        </li>
      ))}

        

      {cart.map((cartItem) => (
        <li key={cartItem.name}>
          {cartItem.name} - ₹{cartItem.price} - {cartItem.category}
        </li>
      ))}
    </div>
  );
}

export default App;
