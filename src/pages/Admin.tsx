import { useAuth } from "../auth/AuthContext";
import "./Admin.css";

export default function Admin() {
  const { usuario } = useAuth();

  return (
    <section className="admin-section">
      <h1>Panel de administración</h1>
      <p>Bienvenido, {usuario?.usuario}.</p>

      <div className="admin-grid">
        <article className="admin-card"><h2>Podcasts</h2><p>Cargar y editar episodios.</p></article>
        <article className="admin-card"><h2>Programación</h2><p>Definir horarios y programas.</p></article>
        <article className="admin-card"><h2>Novedades</h2><p>Publicar noticias del taller.</p></article>
      </div>
    </section>
  );
}