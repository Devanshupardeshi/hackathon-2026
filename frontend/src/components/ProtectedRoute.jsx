import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen label="Signing you in" />;
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
