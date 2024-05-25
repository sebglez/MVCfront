// Grid.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingContext } from "../../context/shoppingContext";

export const Grid = () => {
  const [items, setItems] = useState([]);
  const { addToCart, cart } = useShoppingContext(); // Obtener el carrito del contexto
  const [itemCounts, setItemCounts] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/item").then(({ data }) => {
      setItems(data.items);
      const initialCounts = data.items.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {});
      setItemCounts(initialCounts);
    });
  }, []);

  const handleCountChange = (itemId, newCount) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: newCount,
    }));
  };

  const handleAddToCart = (item) => {
    const selectedCount = itemCounts[item.id];
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    const currentCountInCart = cartItem ? cartItem.quantity : 0;

    if (selectedCount + currentCountInCart <= item.stock) {
      addToCart({ ...item, quantity: selectedCount });
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [item.id]: 1,
      }));
    } else {
      alert("No hay suficiente stock disponible");
    }
  };

  return (
    <div>
      <h1>Movies LowCost</h1>
      {items.map((item) => (
        <div key={item.id}>
          <Link to={`/item/${item.id}`}>
            <h2>{item.title}</h2>
          </Link>
          <img src={item.src} alt={item.title} height={300} />
          <p>{item.description}</p>
          <p>Price: {item.price}€</p>
          <p>Genre: {item.genre}</p>
          <div>
            <select
              value={itemCounts[item.id]}
              onChange={(e) =>
                handleCountChange(item.id, parseInt(e.target.value))
              }
            >
              {Array.from({ length: item.stock }, (_, i) => i + 1).map(
                (count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                )
              )}
            </select>
          </div>
          <FontAwesomeIcon
            icon={faCartShopping}
            beatFade
            size="xl"
            onClick={() => handleAddToCart(item)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          />
        </div>
      ))}
    </div>
  );
};
