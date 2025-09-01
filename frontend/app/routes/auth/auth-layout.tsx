import LoaderIcon from "@/components/Loader/loader";
import { useAuth } from "@/provider/auth-context";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoaderIcon />

  console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to='/profile' />;
  }  
  return <Outlet />;
};

export default AuthLayout;
