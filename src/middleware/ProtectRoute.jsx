import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const ProtectRoute = ({ children }) => {
   const { user } = useAuth();
   const location = useLocation();
   const fromLocation = location.state;

   if (!user) {
      // user is not authenticated
      return fromLocation === "login" ? (
         children
      ) : (
         <Navigate to="/login" replace state={{ from: location }} />
      );
   }

   return children;
};

export default ProtectRoute;
