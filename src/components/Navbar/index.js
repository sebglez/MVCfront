import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavButton } from "../Buttons/buttons";
import { ROUTES } from "../../constants";
import { auth } from "../../firebase";
import { useAuth } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useShoppingContext } from "../../context/shoppingContext";

export const Header = () => {
  const [user, setUser] = useState(null);
  const { authState, setAuthState } = useAuth();
  const { cart, removeFromCart, clearCart } = useShoppingContext();
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();

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
        setAuthState(null);
        console.log("Usuario cerró sesión correctamente");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Calculate total price of items in the cart
  const totalPrice = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const purchasePage = location.pathname === ROUTES.PURCHASE.ROUTE;

  return (
    <div>
      {!user ? (
        <>
          <Link to={ROUTES.HOME.ROUTE}>
            <Button>Home</Button>
          </Link>
          <Link to={ROUTES.LOGIN.ROUTE}>
            <NavButton buttonName="Login" />
          </Link>
          <Link to={ROUTES.SIGNUP.ROUTE}>
            <NavButton buttonName="Signup" />
          </Link>
          {!purchasePage && (
            <FontAwesomeIcon
              icon={faCartShopping}
              size="xl"
              onClick={toggleCart}
            />
          )}
        </>
      ) : (
        <div>
          <Link to={ROUTES.HOME.ROUTE}>
            <Button>Home</Button>
          </Link>
          {authState &&
            (authState.role === "employee" || authState.role === "admin") && (
              <Link to={ROUTES.DASHBOARD.ROUTE}>
                <NavButton buttonName="Dashboard" />
              </Link>
            )}
          <Link to="/profile">
            <Button>Profile</Button>
          </Link>
          <NavButton buttonName="Logout" onClick={logOut} />
          {!purchasePage && (
            <FontAwesomeIcon
              icon={faCartShopping}
              size="xl"
              onClick={toggleCart}
            />
          )}
        </div>
      )}
      {showCart && (
        <div className="cart-content">
          <h6>Cart Items</h6>
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroupItem key={item.id}>
                {item.title} - {item.price}€ x {item.quantity}
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              </ListGroupItem>
            ))}
            <ListGroupItem>
              <strong>Total: {totalPrice}€</strong>
            </ListGroupItem>
          </ListGroup>
          <Button onClick={clearCart} variant="danger">
            Clear Cart
          </Button>
          <Link to={ROUTES.PURCHASE.ROUTE}>
            <Button>Comprar</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
