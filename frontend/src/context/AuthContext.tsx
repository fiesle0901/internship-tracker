import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
  isGuest: boolean;
  loginAsGuest: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedGuest = localStorage.getItem("guest");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else if (storedGuest === "true") {
      setIsGuest(true);
    }

    setIsLoading(false);
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    setIsGuest(false);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.removeItem("guest");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsGuest(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
  };

  const loginAsGuest = () => {
    setUser(null);
    setToken(null);
    setIsGuest(true);

    localStorage.setItem("guest", "true");
  };

  return (
    <AuthContext.Provider
      value={{ user, isGuest, loginAsGuest, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be within an AuthProvider");
  }

  return context;
};
