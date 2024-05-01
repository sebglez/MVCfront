import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

export const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <Link to={ROUTES.USERS.ROUTE}>
            <Button>Users</Button>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.PRODUCTS.ROUTE}>
            {" "}
            <Button>Products</Button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
