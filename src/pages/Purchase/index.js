import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingContext } from "../../context/shoppingContext";
import withHeader from "../../hoc/withHeader";
import { useNavigate } from "react-router-dom";

function Purchase() {
  const { cart, removeFromCart } = useShoppingContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPrice = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const navigate = useNavigate();

  const handleKeepBuying = () => {
    navigate("/");
  };

  return (
    <>
      <ListGroup>
        {cart.map((item) => (
          <ListGroupItem key={item.id}>
            <img src={item.src} alt={item.title} height={110} /> {item.title} -{" "}
            {item.price}€ x {item.quantity}
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
        <Button variant="danger" onClick={handleKeepBuying}>
          KEEP BUYING
        </Button>
        <Button variant="success" onClick={handleShow}>
          BUY
        </Button>
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Complete Name</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control type="text" name="address2" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirm Purchase
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withHeader(Purchase);
