import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        console.log(currentUser);
        if (currentUser) {
          const token = currentUser.accessToken;

          const response = await axios.get(
            `http://localhost:3001/user/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
          console.log(response.data);
        } else {
          console.log("Usuario no autenticado");
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user.user.id);
  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.user.fullname}</p>
      <p>Email: {user.user.email} </p>
      <p>Role: {user.user.role}</p>
      <div>
        <img src={user.user.profileImg} alt={user.user.fullname} height={180} />
      </div>

      <Link to={`${ROUTES.EDITPROFILE.ROUTE}/${user.user.id}`}>
        <button>Edit My Profile</button>
      </Link>

      <br></br>
      <button>Change Password</button>
    </div>
  );
};
