import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingContext } from "../../context/shoppingContext";
import withHeader from "../../hoc/withHeader";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../../validations/userSchema";

function Purchase() {
  const { cart, removeFromCart } = useShoppingContext();
  const [show, setShow] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleClose = () => setShow(false);

  const handleCloseEmptyCartModal = () => setShowEmptyCartModal(false);

  const handleShow = () => {
    if (cart.length === 0) {
      setShowEmptyCartModal(true);
    } else {
      setShow(true);
    }
  };

  const totalPrice = cart
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const navigate = useNavigate();

  const onSubmit = (data) => console.log(data);

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
          CONTINUE BUYING
        </Button>
        <Button variant="success" onClick={handleShow}>
          CHECKOUT
        </Button>
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Complete Name</Form.Label>
              <Form.Control type="text" required {...register("name")} />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required {...register("email")} />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Select Date of Birth</Form.Label>
              <Form.Control type="date" required {...register("dateOfBirth")} />
              {errors.dateOfBirth && (
                <p className="text-danger">{errors.dateOfBirth.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" required {...register("address")} />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control type="text" {...register("address2")} />
              {errors.address2 && (
                <p className="text-danger">{errors.address2.message}</p>
              )}
            </Form.Group>
            <p>Complete Purchase For {totalPrice}€</p>
            <Button variant="primary" type="submit">
              CHECKOUT NOW
            </Button>{" "}
            <Button variant="secondary" onClick={handleClose}>
              CANCEL
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showEmptyCartModal} onHide={handleCloseEmptyCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Empty Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The cart is empty</p>{" "}
          <Button variant="secondary" onClick={handleCloseEmptyCartModal}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withHeader(Purchase);
