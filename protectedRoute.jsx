import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <Component /> : <Navigate to="/log-in" />;
};

export default ProtectedRoute;
