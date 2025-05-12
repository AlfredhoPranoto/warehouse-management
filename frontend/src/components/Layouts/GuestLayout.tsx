import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

type Props = {
  children: React.ReactNode;
};

const GuestLayout = ({ children }: Props) => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to="/inventory" replace />;
  }

  return <>{children}</>;
};

export default GuestLayout;
