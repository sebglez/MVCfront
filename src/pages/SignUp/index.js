import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const firebaseSignup = async (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    setMessage("Se está completando el proceso de registro...");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.uid) {
        await axios.post("http://localhost:3001/user", {
          uid: userCredential.user.uid,
          fullname: userName,
          email: email,
        });
        console.log("Usuario creado exitosamente");

        setTimeout(() => {
          navigate("/");
          navigate(0);
        }, 3000); // Redirigir después de 3 segundos
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={firebaseSignup}>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="userName"
          placeholder="enter a full name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
      {message && <p>{message}</p>}
    </Form>
  );
};
