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

// Credenciales temporales mientras no hay backend.
// TODO: reemplazar por validación real en un servidor cuando esté listo.
const USUARIO_ADMIN = "admin@gmail.com";
const CLAVE_ADMIN = "admin123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardado = sessionStorage.getItem("sesionAdmin");
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
    setCargando(false);
  }, []);

  const login = async (user: string, clave: string): Promise<boolean> => {
    if (user === USUARIO_ADMIN && clave === CLAVE_ADMIN) {
      const sesion: Usuario = { usuario: user, rol: "admin" };
      setUsuario(sesion);
      sessionStorage.setItem("sesionAdmin", JSON.stringify(sesion));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("sesionAdmin");
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