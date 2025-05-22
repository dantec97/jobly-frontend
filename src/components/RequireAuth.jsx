import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

function RequireAuth({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) return <Navigate to="/login" />;
  return children;
}

export default RequireAuth;