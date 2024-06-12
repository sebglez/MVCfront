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
import { SearchBar } from "../Search";
import styles from "./index.module.scss";
import logonavbar from "../../img/logo.png";
import filmcloud from "../../img/filmcloud2.png";

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
    <div className={styles.navBar}>
      {!user ? (
        <>
          <Link to={ROUTES.HOME.ROUTE}>
            <img
              src={filmcloud}
              alt="logo"
              className={styles.logo}
              height={80}
            />
          </Link>

          <ul>
            <div className={styles.searchBox}>
              <li>
                {" "}
                <SearchBar />
              </li>
            </div>

            <div className={styles.buttons}>
              <li>
                <Link to={ROUTES.LOGIN.ROUTE}>
                  <NavButton buttonName="Login" />
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SIGNUP.ROUTE}>
                  <NavButton buttonName="Signup" />
                </Link>
              </li>
              {!purchasePage && (
                <li>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    size="2xl"
                    onClick={toggleCart}
                    className={styles.cart}
                    style={{ color: "#840fe4" }}
                  />
                </li>
              )}
            </div>
          </ul>
        </>
      ) : (
        <div>
          <Link to={ROUTES.HOME.ROUTE}>
            <h4>Movies LowCost</h4>
          </Link>
          <SearchBar />
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
        <div className={styles.cart}>
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
