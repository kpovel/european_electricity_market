import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "./Provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider />,
  },
  {
    path: "/create",
    element: <div>create provider</div>,
  },
  {
    path: "/update/:id",
    element: <div>update provider</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
