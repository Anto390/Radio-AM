import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import illi from "../assets/Mascota-ILLI.png";
import "./Login.css";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setEnviando(true);

    const ok = await login(usuario, clave);
    setEnviando(false);

    if (ok) navigate("/admin");
    else setError("Usuario o contraseña incorrectos.");
  };

  return (
    <section className="login-section">
      <h1>Administrador</h1>

      <div className="login-contenido">
        <img src={illi} alt="Illi, la mascota del taller" className="mascota-login" />

        <form className="login-card" onSubmit={manejarSubmit}>
          <h2>Login</h2>

          {error && <p className="error">{error}</p>}

          <label htmlFor="usuario">Ingrese el Usuario</label>
          <div className="input-wrap">
            <input
              id="usuario"
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <label htmlFor="clave">Ingrese la Contraseña</label>
          <div className="input-wrap">
            <input
              id="clave"
              type={verClave ? "text" : "password"}
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setVerClave((v) => !v)}
              aria-label="Mostrar u ocultar contraseña"
            >
              👁
            </button>
          </div>

          <button type="submit" className="btn-login" disabled={enviando}>
            {enviando ? "Ingresando…" : "Ingresar"}
          </button>

          <a href="/recuperar">Restaurar contraseña</a>
        </form>
      </div>
    </section>
  );
}