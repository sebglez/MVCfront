import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavButton } from "../Buttons/buttons";
import { ROUTES } from "../../constants";

import { auth } from "../../firebase";
import axios from "axios";

export const Header = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Llama a getUsers cuando el componente se monta
  useEffect(() => {
    axios.get("http://localhost:3001/user").then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        // Se ejecuta cuando el usuario cierra sesión correctamente
        console.log("Usuario cerró sesión correctamente");
      })
      .catch((error) => {
        // Manejar errores si ocurrieron durante el cierre de sesión
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div>
      {!user && (
        <>
          <Link to={ROUTES.LOGIN.ROUTE}>
            <NavButton buttonName="Login" />
          </Link>
          <Link to={ROUTES.SIGNUP.ROUTE}>
            <NavButton buttonName="Signup" />
          </Link>
        </>
      )}
      {user && (
        <>
          <Link to={`http://localhost:3000/profile`}>PROFILE</Link>

          <NavButton buttonName="Logout" onClick={logOut} />
        </>
      )}
    </div>
  );
};
