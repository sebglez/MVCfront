import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import { ROUTES } from "./constants";
import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { Products } from "./pages/Dashboard/products";
import { Users } from "./pages/Dashboard/users";
import { Sidebar } from "./components/Sidebar";
import AddProduct from "./components/Form/addProduct";
import { EditProduct } from "./components/Form/editProduct";
import Product from "./pages/Product/product";
import { User } from "./pages/User/user";
import Profile from "./pages/Profile/profile";
import EditProfile from "./components/Form/editProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShoppingProvider } from "../src/context/shoppingContext"; // Importa el ShoppingProvider
import { auth } from "./firebase";

export const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: ROUTES.LOGIN.ROUTE,
      element: <Login />,
    },
    {
      path: ROUTES.SIGNUP.ROUTE,
      element: <Signup />,
    },
    {
      path: ROUTES.DASHBOARD.ROUTE,
      element: <Sidebar />,
    },
    { path: ROUTES.PRODUCTS.ROUTE, element: <Products /> },
    { path: ROUTES.USERS.ROUTE, element: <Users /> },
    { path: ROUTES.ADDPRODUCT.ROUTE, element: <AddProduct /> },
    { path: ROUTES.EDITPRODUCT.ROUTE, element: <EditProduct /> },
    { path: ROUTES.GETPRODUCT.ROUTE, element: <Product /> },
    { path: ROUTES.USERS.ROUTE, element: <Users /> },
    { path: ROUTES.GETUSER.ROUTE, element: <User /> },
    { path: ROUTES.PROFILE.ROUTE, element: <Profile /> },
    {
      path: ROUTES.EDITPROFILE.ROUTE,
      element: <EditProfile />,
    },
  ]);

  return (
    <ShoppingProvider>
      <RouterProvider router={router}></RouterProvider>
    </ShoppingProvider>
  );
};
