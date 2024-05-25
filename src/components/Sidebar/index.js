import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Products } from "../../pages/Dashboard/products";
import { Users } from "../../pages/Dashboard/users";

export const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "users":
        return <Users />;
      case "products":
        return <Products />;
      case "close":
        return "";
      default:
    }
  };

  return (
    <aside>
      <Button onClick={() => setActiveComponent("close")}>Close List</Button>
      <ul>
        <li>
          <Button onClick={() => setActiveComponent("users")}>Users</Button>
        </li>
        <li>
          <Button onClick={() => setActiveComponent("products")}>
            Products
          </Button>
        </li>
      </ul>
      <div>{renderComponent()}</div>
    </aside>
  );
};
