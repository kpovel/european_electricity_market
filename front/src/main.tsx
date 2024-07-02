import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "./Provider";
import { CreateProvider } from "./provider-create/CreateProvider";
import { UpdateProvider } from "./provider-update/UpdateProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider />,
  },
  {
    path: "/provider/create",
    element: <CreateProvider />,
  },
  {
    path: "/update/:id",
    element: <UpdateProvider />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
