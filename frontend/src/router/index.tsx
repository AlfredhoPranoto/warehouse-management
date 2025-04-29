import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import StaffPage from "../pages/Staff";
import InventoryPage from "../pages/Inventory";
import { authMiddleware, roleMiddleware } from "../middleware/authMiddleware";
import CreateProductPage from "../pages/CreateProduct";
import EditProductPage from "../pages/EditProduct";
import EditStaffPage from "../pages/EditStaff";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "staffs",
    element: <StaffPage />,
    loader: roleMiddleware,
  },
  {
    path: "/users/edit/:id",
    element: <EditStaffPage />,
  },
  {
    path: "inventory",
    element: <InventoryPage />,
    loader: authMiddleware,
  },
  {
    path: "/inventory/create",
    element: <CreateProductPage />,
    loader: roleMiddleware,
  },
  {
    path: "/inventory/edit/:id",
    element: <EditProductPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
    // loader: authMiddleware,
  },
]);
