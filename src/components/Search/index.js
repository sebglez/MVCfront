import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";

export const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const resultsContainerRef = useRef(null);

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

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }, [search, items]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBodyClick = (e) => {
    if (
      resultsContainerRef.current &&
      !resultsContainerRef.current.contains(e.target)
    ) {
      setSearch("");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <div className={styles.searchNavBox}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      {search && (
        <div className={styles.resultsContainer} ref={resultsContainerRef}>
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={`/item/${item.id}`}
              className={styles.searchDataBox}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={styles.searchData}>
                <div className={styles.searchBoxImg}>
                  <img src={item.src} alt={item.title} height={80} />
                </div>
                <div className={styles.textContainer}>
                  <p className={styles.title}>{item.title}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
