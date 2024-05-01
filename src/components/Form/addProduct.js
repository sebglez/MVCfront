import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    genre: "",
    src: "",
    age: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:3001/item", formData);
      // Limpiar el formulario después de agregar un nuevo producto
      setFormData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        genre: "",
        src: "",
        age: 0,
      });
      alert("Producto agregado exitosamente");
    } catch (error) {
      alert("Error al agregar el producto");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
        />
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
        <label>Src-Img:</label>
        <input
          type="text"
          name="src"
          value={formData.src}
          onChange={handleInputChange}
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
