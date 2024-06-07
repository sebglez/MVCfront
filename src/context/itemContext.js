import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";

const initialState = [];

const ItemsContext = createContext(initialState);

function itemsReducer(state, action) {
  switch (action.type) {
    case "GET_ITEMS":
      return action.payload;

    case "GET_ITEM":
      const showItem = action.payload;
      return showItem ? showItem : state;

    case "ADD_ITEM":
      const newItem = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        stock: action.payload.stock,
        genre: action.payload.genre,
        src: action.payload.src,
        age: action.payload.age,
      };
      return [...state, newItem];

    case "SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "EDIT_ITEM":
      const updatedItem = action.payload; // El ítem actualizado recibido del servidor
      const updatedStateItems = state.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      return updatedStateItems;

    case "DELETE_ITEM":
      const idToDelete = action.payload;
      return state.filter((item) => item.id !== idToDelete);

    default:
      return state;
  }
}

function useContextItems() {
  const context = useContext(ItemsContext);

  const getItemById = (id) => {
    return context.items.find((item) => item.id === id);
  };

  return { ...context, getItemById };
}

function ContextProvider({ children }) {
  const [items, dispatch] = useReducer(itemsReducer, initialState);

  const getItems = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/item");
      dispatch({ type: "GET_ITEMS", payload: response.data });
    } catch (error) {
      console.error("Error getting items:", error);
    }
  }, []);

  const getItem = useCallback(async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/item/${id}`);
      return response.data.item;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  }, []);

  const addItem = useCallback(async (addNewItem) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/item",
        addNewItem
      );
      dispatch({ type: "ADD_ITEM", payload: response.data });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }, []);

  async function deleteItem(oldItemId) {
    try {
      await axios.delete(`http://localhost:3001/item/${oldItemId}`);
      dispatch({ type: "DELETE_ITEM", payload: oldItemId });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  const editItem = async (
    id,
    newTitle,
    newDescription,
    newPrice,
    newStock,
    newGenre,
    newSrc,
    newAge
  ) => {
    try {
      const response = await axios.patch(`http://localhost:3001/item/${id}`, {
        id: id,
        title: newTitle,
        description: newDescription,
        price: newPrice,
        stock: newStock,
        genre: newGenre,
        src: newSrc,
        age: newAge,
      });
      const updatedItem = response.data;
      console.log("ID del elemento a editar:", response.data.id);
      dispatch({ type: "EDIT_ITEM", payload: updatedItem });
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  const searchQuery = (query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  const value = {
    items,
    getItems,
    addItem,
    deleteItem,
    editItem,
    getItem,
    searchQuery,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}

export { ContextProvider, useContextItems };
