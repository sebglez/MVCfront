import React, { useEffect, useState } from "react";

import axios from "axios";
import { useContextUsers } from "../../context/userContext";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = useContextUsers();

  // Llama a getUsers cuando el componente se monta
  useEffect(() => {
    axios.get("http://localhost:3001/user").then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  return (
    <div>
      <h1>Lista de usuarios:</h1>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              {user.fullname}
              <Link to={`http://localhost:3000/dashboard/users/${user.id}`}>
                <button>Show Info</button>
              </Link>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
