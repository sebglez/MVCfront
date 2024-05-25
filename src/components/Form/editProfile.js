import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "./../../context/userContext";
import withHeader from "../../hoc/withHeader";

const EditProfile = () => {
  const { id } = useParams();
  const [userValue, setUserValue] = useState({});
  const navigate = useNavigate();
  const { authState } = useAuth();
  console.log(authState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/profile/${id}`,
          {
            headers: { Authorization: `Bearer ${authState.token}` },
          }
        );
        setUserValue(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValue({ ...userValue, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3001/user/profile/${id}`, userValue);
      navigate(`/profile`);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSaveChanges}>
        <label>Fullname:</label>
        <input
          type="text"
          name="fullname"
          value={userValue.fullname || ""}
          onChange={handleInputChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userValue.email || ""}
          onChange={handleInputChange}
        />
        <br />

        <label>Profile Image URL:</label>
        <input
          type="text"
          name="profileImg"
          value={userValue.profileImg || ""}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default withHeader(EditProfile);
