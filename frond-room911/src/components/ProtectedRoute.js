import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function ProtectedRoute({ children, role }) {
  const user = getCurrentUser();

  if (!user) {
    alert("Debes iniciar sesión para acceder a esta página.");
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    alert("No tienes permiso para acceder a esta página.");
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
