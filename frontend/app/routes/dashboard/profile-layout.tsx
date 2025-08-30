import { useAuth } from "@/provider/auth-context";
import { Navigate, Outlet } from "react-router";

const ProfileLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to='/sign-in' />;
  return <Outlet />;
};

export default ProfileLayout;
