"use client";

import { AxiosError } from "axios";
import { APIUser } from "discord-api-types/v10";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { api, handleApiError } from "@/lib/api";

export interface AuthContextType {
  user?: APIUser | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<APIUser | null | undefined>(undefined);

  const login = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/?action=login");
    setUser(null);
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const data = await api.get<APIUser>("/@me").then((res) => res.data);
      setUser(data);
    } catch (err) {
      setUser(null);
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        logout();
      } else {
        handleApiError(err);
      }
    }
  };

  useEffect(() => {
    void checkAuthStatus();
  }, []);

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
