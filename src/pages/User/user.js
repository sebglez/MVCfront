import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const User = () => {
  const { id } = useParams(); // Obtener el ID del usuario de los parámetros de la URL
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    // Realizar una solicitud GET al backend para obtener los datos del usuario
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((response) => {
        // Actualizar el estado con los datos del usuario recibidos del backend
        setUser(response.data.user);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.error("Error getting user:", error);
        // Manejar errores de solicitud
      });
  }, [id]); // Asegurarse de actualizar la solicitud cuando cambie el ID del usuario

  // Renderizar los datos del usuario en la interfaz de usuario
  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.fullname}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <img src={user.profileImg} alt={user.fullname} height={180} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
