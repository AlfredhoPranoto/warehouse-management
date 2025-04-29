import { redirect } from "react-router-dom";

// Authentication middleware - checks if user is logged in
export async function authMiddleware() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  return null;
}

// Role middleware - checks if user has the required role
export async function roleMiddleware() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return redirect("/login");
  }

  const userData = JSON.parse(user);

  if (userData.role === "staff") {
    return redirect("/inventory");
  }

  return null;
}
