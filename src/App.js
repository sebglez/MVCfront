import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Grid } from "./components/Grid";
import React from "react";

export const App = () => {
  console.log(process.env.REACT_APP_PRUEBA, "prueba--");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Grid />,
    },
  ]);

  return <RouterProvider router={router} />;
};
