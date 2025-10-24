import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, doctorId: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Session timeout (15 minutes)
  const SESSION_TIMEOUT = 15 * 60 * 1000;
  let inactivityTimer: NodeJS.Timeout;

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT);
  };

  useEffect(() => {
    // Check for existing session in sessionStorage (more secure than localStorage)
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      resetInactivityTimer();
    }
    setIsLoading(false);

    // Setup activity listeners
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call to backend
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      // Mock login for demo
      const mockUser: User = {
        id: "doctor_001",
        name: "Dr. " + email.split("@")[0],
        email: email,
        role: "doctor",
      };
      const mockToken = "jwt_token_" + Date.now();

      setUser(mockUser);
      setToken(mockToken);
      
      // Store in sessionStorage (not localStorage for better security)
      sessionStorage.setItem("token", mockToken);
      sessionStorage.setItem("user", JSON.stringify(mockUser));
      
      resetInactivityTimer();
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const signup = async (name: string, email: string, password: string, doctorId: string) => {
    try {
      // TODO: Replace with actual API call to backend
      // const response = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password, doctorId })
      // });

      // Mock signup - auto login after signup
      await login(email, password);
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    clearTimeout(inactivityTimer);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
