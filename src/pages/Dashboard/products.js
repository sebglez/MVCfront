import React, { useState, useEffect } from "react";
import { useContextItems } from "../../context/itemContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

export const Products = () => {
  // Obtenemos el contexto de los ítems
  const { deleteItem } = useContextItems();

  // Efecto para cargar los ítems al montar el componente
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/item").then(({ data }) => {
      setItems(data.items);
    });
  }, []);

  // Manejador para eliminar un ítem

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId);
  };

  // Editar producto

  return (
    <div>
      <Link to={ROUTES.ADDPRODUCT.ROUTE}>
        <button>Add Product</button>
      </Link>
      <h1>Products</h1>
      <ul>
        {/* Renderizar los ítems en la lista */}
        {items.map((item) => (
          <li key={item.id}>
            <strong>
              Title: {item.title} ({item.age}){" "}
              <img src={item.src} alt={item.title} height={60} />
              <br />
              Genre: {item.genre}
            </strong>
            <br />
            Description: {item.description} <br></br>Price: {item.price}
            <br />
            <Link to={`http://localhost:3000/dashboard/items/edit/${item.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
