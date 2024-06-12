import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useShoppingContext } from "../../context/shoppingContext";
import styles from "./index.module.scss";

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
    <div className={styles.moviesGrid}>
      {items.map((item) => (
        <div className={styles.movieTarget}>
          <div key={item.id}>
            <Link to={`/item/${item.id}`} style={{ textDecoration: "none" }}>
              <img src={item.src} alt={item.title} className={styles.gridImg} />{" "}
              <p className={styles.title}>{item.title}</p>
            </Link>
            <p className={styles.genre}>{item.genre}</p>
            <div className={styles.selectPrice}>
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

              <div className={styles.moviePrice}>
                {" "}
                <strong>{item.price}€</strong>
              </div>
            </div>
            <button
              className={styles.addToCart}
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
