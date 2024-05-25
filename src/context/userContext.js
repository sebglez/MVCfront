import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import axios from "axios";

// Definir el estado inicial para los usuarios y la autenticación
const initialUsersState = [];
const initialAuthState = null;

// Crear contextos separados para usuarios y autenticación
const UsersContext = createContext(initialUsersState);
const AuthContext = createContext(initialAuthState);

// Reducer y acciones para usuarios
function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;
    case "DELETE_USER":
      const idToDelete = action.payload;
      return state.filter((user) => user.id !== idToDelete);
    case "UPDATE_USER":
      const updatedUser = action.payload;
      return state.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    default:
      return state;
  }
}

// Proveedor de contexto para usuarios
function UsersProvider({ children }) {
  const [users, dispatch] = useReducer(usersReducer, initialUsersState);
  const [userId, setUserId] = useState(null); // Añadir el estado para userId

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/user");
      dispatch({ type: "GET_USERS", payload: response.data.users });
    } catch (error) {
      console.error("Error getting users", error);
    }
  }, []);

  function deleteUser(oldUserId) {
    try {
      axios.delete(`http://localhost:3001/user/${oldUserId}`);
      dispatch({ type: "DELETE_USER", payload: oldUserId });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const updateUser = useCallback(async (userId, updatedUserData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/user/${userId}`,
        updatedUserData
      );
      dispatch({ type: "UPDATE_USER", payload: response.data.updatedUser });
      console.log("Usuario actualizado con éxito:", response.data.updatedUser);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  }, []);

  const value = { users, getUsers, deleteUser, updateUser, userId };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

// Proveedor de contexto para autenticación
function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto de usuarios
function useContextUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useContextUsers must be used within a UsersProvider");
  }
  return context;
}

// Hook personalizado para acceder al contexto de autenticación
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { UsersProvider, useContextUsers, AuthProvider, useAuth };
