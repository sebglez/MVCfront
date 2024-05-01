import React from "react";
import { Button } from "react-bootstrap";

export const NavButton = ({ buttonName, onClick, ...props }) => {
  return (
    <Button variant="light" onClick={onClick} {...props}>
      {buttonName}
    </Button>
  );
};
