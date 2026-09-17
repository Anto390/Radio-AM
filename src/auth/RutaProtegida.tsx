import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RutaProtegida({ children }: { children: ReactNode }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <p style={{ padding: 40 }}>Cargando…</p>;
  if (!usuario || usuario.rol !== "admin") return <Navigate to="/login" replace />;

  return <>{children}</>;
}