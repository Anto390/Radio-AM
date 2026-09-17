import { useRef, useState } from "react";
import logoRadio from "../assets/logo-radio.jpeg";
import illi from "../assets/Mascota-ILLI.png";
import "./Home.css";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [sonando, setSonando] = useState(false);
  const [volumen, setVolumen] = useState(0.8);

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
    <section className="home">
      <span className="live">● LIVE</span>

      <div className="home-contenido">
        <div className="home-info">
          <h2>Siguiente Programación</h2>
          <div className="proxima"><span>Podcast</span><span>Hora</span></div>
        </div>

        <div className="reproductor">
          <img src={logoRadio} alt="Taller de Radio" className="caratula" />
          <p className="cancion">Nombre canción y Autor</p>

          <div className="controles">
            <button onClick={detener} aria-label="Detener">■</button>
            <button onClick={reproducir} aria-label="Reproducir" className="play">
              {sonando ? "❚❚" : "▶"}
            </button>
            <input
              type="range" min={0} max={1} step={0.05}
              value={volumen}
              onChange={(e) => cambiarVolumen(Number(e.target.value))}
            />
          </div>
        </div>

        <img src={illi} alt="Radio_AM/src/assets/Mascota-ILLI.png" className="mascota" />
      </div>

      <audio ref={audioRef} src="https://TU-STREAM-AQUI/stream" preload="none" />
    </section>
  );
}