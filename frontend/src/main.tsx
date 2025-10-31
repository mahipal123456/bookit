import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from "./App";
import ExperiencesGrid from "./components/ExperiencesGrid";
import DetailPage from "./components/DetailPage";
import CheckoutPage from "./components/CheckoutPage";
import BookingConfirmed from "./components/BookingConfirmed";
import "./index.css"; // optional if you’re using Tailwind or CSS

// ✅ Define your router first
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ExperiencesGrid />,
      },
      {
        path: "details/:_id",
        element: <DetailPage />,
      },
      {
        path: "checkout/:id",
        element: <CheckoutPage />,
      },
      {
        path:"result",
        element:<BookingConfirmed/>
      },{
    path: "*",
    element: <Navigate to="/" replace />, // catch-all route
      }
    ],
  },
]);

// ✅ Then render it inside RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
