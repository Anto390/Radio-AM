import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import fondoEscuela from "../assets/fondo-escuela.png";
import { activarEnVivo, desactivarEnVivo, estaEnVivo } from "../EnVivo";
import "./Admin.css";

interface Cancion {
  id: number;
  nombre: string;
  autor: string;
}

export default function Admin() {
  const { usuario } = useAuth();

  // ----- Estado: canciones -----
  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [mostrarFormCancion, setMostrarFormCancion] = useState(false);
  const [nombreCancion, setNombreCancion] = useState("");
  const [autorCancion, setAutorCancion] = useState("");

  const agregarCancion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombreCancion.trim()) return;

    const nueva: Cancion = {
      id: Date.now(),
      nombre: nombreCancion.trim(),
      autor: autorCancion.trim(),
    };

    setCanciones((prev) => [...prev, nueva]);
    setNombreCancion("");
    setAutorCancion("");
    setMostrarFormCancion(false);

    // Más adelante, cuando haya backend:
    // fetch("/api/canciones", { method: "POST", body: JSON.stringify(nueva) })
  };

  const eliminarCancion = (id: number) => {
    setCanciones((prev) => prev.filter((c) => c.id !== id));

    // Más adelante, cuando haya backend:
    // fetch(`/api/canciones/${id}`, { method: "DELETE" })
  };

  // ----- Estado: en vivo (compartido con la Home vía localStorage) -----
  const [enVivo, setEnVivo] = useState(estaEnVivo());

  const iniciarVivo = () => {
    activarEnVivo();
    setEnVivo(true);
  };

  const finalizarVivo = () => {
    desactivarEnVivo();
    setEnVivo(false);
  };

  return (
    <section className="admin-section" style={{ backgroundImage: `url(${fondoEscuela})` }}>
      <div className="admin-overlay">
        <h1>Panel de administración</h1>
        <p>Bienvenido, {usuario?.usuario}.</p>

        <div className="admin-acciones">
          {/* ---- Botón agregar canción ---- */}
          <button className="btn-admin" onClick={() => setMostrarFormCancion((v) => !v)}>
            {mostrarFormCancion ? "Cancelar" : "Agregar canción"}
          </button>

          {/* ---- Botones de transmisión en vivo ---- */}
          {!enVivo ? (
            <button className="btn-admin btn-vivo" onClick={iniciarVivo}>
              Iniciar transmisión en vivo
            </button>
          ) : (
            <>
              <span className="badge-en-vivo">● EN VIVO</span>
              <button className="btn-admin btn-finalizar" onClick={finalizarVivo}>
                Finalizar transmisión
              </button>
            </>
          )}
        </div>

        {mostrarFormCancion && (
          <form className="form-cancion" onSubmit={agregarCancion}>
            <div className="campo">
              <label htmlFor="nombreCancion">Nombre de la canción</label>
              <input
                id="nombreCancion"
                type="text"
                value={nombreCancion}
                onChange={(e) => setNombreCancion(e.target.value)}
                placeholder="Ej: Bohemian Rhapsody"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="autorCancion">Autor</label>
              <input
                id="autorCancion"
                type="text"
                value={autorCancion}
                onChange={(e) => setAutorCancion(e.target.value)}
                placeholder="Ej: Queen"
              />
            </div>

            <button type="submit" className="btn-admin btn-guardar">Guardar canción</button>
          </form>
        )}

        {canciones.length > 0 && (
          <ul className="lista-canciones">
            {canciones.map((c) => (
              <li key={c.id}>
                <span><strong>{c.nombre}</strong>{c.autor && ` — ${c.autor}`}</span>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarCancion(c.id)}
                  aria-label={`Eliminar ${c.nombre}`}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="admin-grid">
          <article className="admin-card">
            <h2>Podcasts</h2>
            <p>Cargar y editar episodios.</p>
          </article>
          <article className="admin-card">
            <h2>Programación</h2>
            <p>Definir horarios y programas.</p>
          </article>
        </div>
      </div>
    </section>
  );
}