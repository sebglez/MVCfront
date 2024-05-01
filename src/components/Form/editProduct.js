import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContextItems } from "../../context/itemContext";
import axios from "axios";

export const EditProduct = () => {
  const { id } = useParams();
  const { editItem } = useContextItems();
  const [itemValue, setItemValue] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/item/${id}`).then(({ data }) => {
      setItemValue(data);
    });
  }, [id]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/item/${id}`, itemValue);
      console.log("Changes saved");
      navigate("/dashboard/items");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemValue({
      ...itemValue,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Edit product</h2>
      {itemValue && (
        <form onSubmit={handleSaveChanges}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={itemValue.title}
            onChange={handleInputChange}
          />
          <br />
          <label>Description:</label>
          <textarea
            name="description"
            value={itemValue.description}
            onChange={handleInputChange}
          />{" "}
          <br />
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={itemValue.age}
            onChange={handleInputChange}
          />{" "}
          <br />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={itemValue.price}
            onChange={handleInputChange}
          />{" "}
          <br />
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={itemValue.stock}
            onChange={handleInputChange}
          />{" "}
          <br />
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={itemValue.genre}
            onChange={handleInputChange}
          />{" "}
          <br />
          <label>Src:</label>
          <input
            type="text"
            name="src"
            value={itemValue.src}
            onChange={handleInputChange}
          />{" "}
          <br />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};
