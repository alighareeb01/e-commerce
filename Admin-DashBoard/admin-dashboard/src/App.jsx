import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Footer from "./components/Footer/Footer";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
import Layoutsecondary from "./components/Layoutsecondary/Layoutsecondary";
import Users from "./components/Users/Users";
import Adduser from "./components/Adduser/Adduser";
import Dashboard from "./components/Dashboard/Dashboard";
import AddAdmin from "./components/AddAdmin/AddAdmin";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "adduser",
        element: <Adduser />,
      },
      {
        path: "addadmin",
        element: <AddAdmin />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layoutsecondary />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-[url('/b.jpg')] bg-cover  bg-no-repeat  bg-center min-h-screen relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <RouterProvider router={routes}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
