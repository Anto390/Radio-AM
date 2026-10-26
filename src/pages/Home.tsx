import { useEffect, useRef, useState } from "react";
import logoRadio from "../assets/logo-radio.jpeg";
import illiVideo from "../assets/Illi-saludando.mp4";
import fondoEscuela from "../assets/fondo-escuela.png";
import { estaEnVivo } from "../EnVivo";
import VolumenBarras from "../components/VolumenBarras";
import Programacion from "../components/Programacion";
import "./Home.css";

const programas = [
  { id: 1, nombre: "Podcast", hora: "10:00" },
  { id: 2, nombre: "Podcast", hora: "11:00" },
  { id: 3, nombre: "Podcast", hora: "12:00" },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sonando, setSonando] = useState(false);
  const [volumen, setVolumen] = useState(1);
  const [enVivo, setEnVivo] = useState(estaEnVivo());

  useEffect(() => {
    const actualizar = () => setEnVivo(estaEnVivo());

    window.addEventListener("storage", actualizar);
    window.addEventListener("cambioEnVivo", actualizar);

    return () => {
      window.removeEventListener("storage", actualizar);
      window.removeEventListener("cambioEnVivo", actualizar);
    };
  }, []);

  const reproducir = () => {
    audioRef.current?.play();
    setSonando(true);
  };

  const detener = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setSonando(false);
  };

  const cambiarVolumen = (valor: number) => {
    setVolumen(valor);
    if (audioRef.current) audioRef.current.volume = valor;
  };

  return (
    <section className="home" style={{ backgroundImage: `url(${fondoEscuela})` }}>
      {enVivo && <span className="live">● LIVE</span>}

      <div className="home-contenido">
        <Programacion programas={programas} />

        <div className="reproductor">
          <img src={logoRadio} alt="Taller de Radio" className="caratula" />
          <p className="cancion">Nombre canción y Autor</p>

          <div className="controles">
            <button onClick={detener} aria-label="Detener">■</button>
            <button onClick={reproducir} aria-label="Reproducir" className="play">
              {sonando ? "❚❚" : "▶"}
            </button>
            <VolumenBarras volumen={volumen} onChange={cambiarVolumen} />
          </div>
        </div>

        <video
          className="mascota"
          src={illiVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Illi, la mascota del taller, saludando"
        />
      </div>

      <audio ref={audioRef} src="https://TU-STREAM-AQUI/stream" preload="none" />
    </section>
  );
}