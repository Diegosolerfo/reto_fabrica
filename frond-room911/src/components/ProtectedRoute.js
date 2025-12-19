import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function ProtectedRoute({ children, role }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
