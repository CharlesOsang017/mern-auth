import type { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useNavigate } from "react-router";
import { toast } from "sonner";
// import { publicRoutes } from "@/lib";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  // check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const userInfo = localStorage.getItem("user");
      console.log('userInfo', userInfo);

      if (userInfo) {
        setUser(JSON.parse(userInfo));
        setIsAuthenticated(true);
        
        } else {
        setIsAuthenticated(false);

      }
      setIsLoading(false);
    };
    checkAuth();
    
  }, []);

  // handling force log out functionality
  useEffect(() => {
    const handleForceLogout = () => {
      logout();
      navigate("/sign-in");
    };
    window.addEventListener("force-logout", handleForceLogout);
    return () => {
      window.removeEventListener("force-logout", handleForceLogout);
    };
  }, []);

  const login = async (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data?.user);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
    toast.success("Logged out successfully");
  };
  const values = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// This function ensures the useAuth hook is used within a AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
