import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo-escuela.jpg";
import "./Header.css";

export default function Header() {
  const { usuario, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo E.S.E.T.P N°724" />
        </Link>

        {usuario ? (
          <button className="btn-ingresar" onClick={logout}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="btn-ingresar">
            Ingresar
          </Link>
        )}
      </div>
    </header>
  );
}