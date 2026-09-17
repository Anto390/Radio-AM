import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";


interface Usuario {
  usuario: string;
  rol: "admin";
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  login: (usuario: string, clave: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  // Al cargar la app se le pregunta al servidor si hay sesión activa
  useEffect(() => {
    fetch("/api/sesion", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Usuario | null) => setUsuario(data))
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false));
  }, []);

  const login = async (user: string, clave: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ usuario: user, clave }),
      });
      if (!res.ok) return false;
      const data: Usuario = await res.json();
      setUsuario(data);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .finally(() => setUsuario(null));
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}