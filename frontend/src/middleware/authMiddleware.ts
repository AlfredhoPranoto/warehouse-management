import { redirect } from "react-router-dom";

export async function authMiddleware() {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }

  return null;
}

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
