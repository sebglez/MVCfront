import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { Button, Form, Modal } from "react-bootstrap";
import withHeader from "../../hoc/withHeader";
import { getAuth, updatePassword } from "firebase/auth";

const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const changePassword = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const fireBaseUser = auth.currentUser;
    const newPassword = e.target.password.value;

    console.log(fireBaseUser);
    console.log(newPassword);
    updatePassword(fireBaseUser, newPassword)
      .then(() => {
        console.log("Update successful");
        navigate("/");
      })
      .catch((error) => {
        console.log("An error ocurred");
      });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = currentUser.accessToken;

          const response = await axios.get(
            `http://localhost:3001/user/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
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

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.user.fullname}</p>
      <p>Email: {user.user.email}</p>
      <p>Role: {user.user.role}</p>
      <div>
        <img src={user.user.profileImg} alt={user.user.fullname} height={180} />
      </div>
      <Link to={`${ROUTES.EDITPROFILE.ROUTE.replace(":id", user.user.id)}`}>
        <Button>Edit My Profile</Button>
      </Link>
      <br />
      <>
        <Button variant="primary" onClick={handleShow}>
          Change password
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={changePassword}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default withHeader(Profile);
