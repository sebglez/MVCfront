import React, { useEffect, useState } from "react";
import { useContextItems } from "../../context/itemContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import withHeader from "../../hoc/withHeader";

const Product = () => {
  const { id } = useParams(); // Make sure 'id' is extracted correctly
  const { getItem } = useContextItems();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/item/${id}`).then(({ data }) => {
      setItem(data.item);
    });
  }, [id, getItem]);

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.title}</h2>
          <p>Description: {item.description}</p>
          <p>Price: {item.price}</p>
          <p>Stock: {item.stock}</p>
          <p>Genre: {item.genre}</p>
          <p>Age: {item.age}</p>
          <img src={item.src} alt={item.title} height={500} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withHeader(Product);
