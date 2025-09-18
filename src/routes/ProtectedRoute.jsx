import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children, user, loading, redirect = "/login" }) => {
  const location = useLocation();

  // ⏳ While checking auth, don’t redirect
  if (loading) {
    return <Spinner />
  }

  // 🚪 If not logged in, go to login but keep the intended route
  if (!user) {
    return <Navigate to={redirect} replace state={{ from: location }} />;
  }

  return children;
};

ProtectRoute.propTypes = {
  children: PropTypes.node,
  user: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
};

export default ProtectRoute;
