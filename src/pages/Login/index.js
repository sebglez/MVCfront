import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Spinner } from "react-bootstrap";
import { auth } from "../../firebase";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext"; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Estado para el mensaje de bienvenida
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const { setUser } = useContext(AuthContext); // Obtiene la función setUser del contexto de autenticación
  const navigate = useNavigate(); // Obtiene la función de navegación

  const firebaseLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Una vez que el usuario ha iniciado sesión correctamente, obtener el token de ID del usuario
      const token = await userCredential.user.getIdToken();

      // Realiza la solicitud al backend para obtener los datos del usuario
      const response = await axios.get(
        `http://localhost:3001/user/login/${userCredential.user.uid}`, // Cambiado el endpoint de la solicitud
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Actualiza el contexto de autenticación con los datos del usuario recibidos del backend
      setUser(response.data.user);

      // Muestra el mensaje de bienvenida con el nombre de usuario
      setMessage("¡Bienvenido!");

      // Redirige al usuario a la página principal después del inicio de sesión exitoso
      navigate("/");
      navigate(0);
    } catch (error) {
      console.error(error.message);
      // Muestra el mensaje de error en caso de falla de inicio de sesión
      setError("Error during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && <p>{message}</p>} {error && <p>{error}</p>}{" "}
      {/* Muestra el mensaje de error si está presente */}
      <Form onSubmit={firebaseLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};
