import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const GuestLayout = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/inventory" replace />;
  }

  return <>{children}</>;
};

export default GuestLayout;
