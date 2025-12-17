import { createContext, useState, useEffect, use } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  User,
} from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/api/constants";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export type UserDetails = {
  id: number;
  email: string;
  role: "user" | "admin";
  is_active: 1 | 0;
  created_at: string;
  updated_at: string;
  details: {
    first_name: string;
    last_name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
  addresses: [
    {
      address_type: string;
      line_1: string;
      line_2: string;
      city: string;
      state: string;
      postal_code: string;
      country_code: string;
      is_default: 1 | 0;
      created_at: string;
      updated_at: string;
    }
  ];
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const response = await apiLogin({ email, password });
      console.log(response);

      // Store tokens and user in localStorage
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

      setUser(response.user);
      return true;
    } catch (e: unknown) {
      console.log({ e });
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    apiLogout();
    setUser(null);
  }

  async function signup(email: string, password: string) {
    try {
      setLoading(true);
      const response = await apiRegister({ email, password });
      console.log(response);
      return true;
    } catch (e: unknown) {
      console.log({ e });
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Restore user session from localStorage on mount
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (storedUser && accessToken) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        // Clear invalid data
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
