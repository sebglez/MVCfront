import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Navbar";
import { Link } from "react-router-dom";

export const Grid = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/item").then(({ data }) => {
      setItems(data.items);
    });
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1>Movies LowCost</h1>
        {items.map((item) => (
          <div key={item.id}>
            <Link to={`/item/${item.id}`}>
              <h2>{item.title}</h2>
            </Link>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
            <p>Genre: {item.genre}</p>
            <img src={item.src} alt={item.title} height={300} />
          </div>
        ))}
      </div>
    </>
  );
};
