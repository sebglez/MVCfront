import React, { useState, useEffect } from "react";
import axios from "axios";

export function Grid() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/item").then(({ data }) => {
      setItems(data.items);
    });
  }, []);

  return (
    <div>
      <h1>Movies LowCost</h1>
      {items.map(({ id, title, description, price, stock, genre, src }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Price: {price}</p>
          <p>Stock: {stock}</p>
          <p>Genre: {genre}</p>
          <img src={src} alt={title} />
        </div>
      ))}
    </div>
  );
}
