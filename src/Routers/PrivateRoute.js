import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("Token");

  if (token) {
    return children;
  }
  return <Navigate to="/singUp" state={{ from: location }}></Navigate>;
};
export default PrivateRoute;
