import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/item");
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search items"
        value={search}
        onChange={handleSearchChange}
      />
      <div>
        {search &&
          filteredItems.map((item) => (
            <div key={item.id}>
              <div>
                <img src={item.src} alt={item.title} height={100} />
                <h6>{item.title}</h6>
              </div>

              <p>Price: {item.price}€</p>
            </div>
          ))}
      </div>
    </div>
  );
};
