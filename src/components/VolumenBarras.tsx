import "./VolumenBarras.css";

interface VolumenBarrasProps {
  volumen: number; // 0 a 1
  onChange: (valor: number) => void;
}

const NIVELES = [1, 2, 3, 4, 5];

export default function VolumenBarras({ volumen, onChange }: VolumenBarrasProps) {
  const nivelActual = Math.round(volumen * 4) + 1; // 0→1, 0.25→2, 0.5→3, 0.75→4, 1→5
  const porcentaje = (nivelActual - 1) * 25;

  const manejarClick = (nivel: number) => {
    const nuevoVolumen = (nivel - 1) / 4; // 1→0, 2→0.25, 3→0.5, 4→0.75, 5→1
    onChange(nuevoVolumen);
  };

  return (
    <div className="contenedor-volumen">
      <div className="volumen">
        {NIVELES.map((nivel) => (
          <div
            key={nivel}
            className={`barra ${nivel <= nivelActual ? "activa" : ""}`}
            data-nivel={nivel}
            onClick={() => manejarClick(nivel)}
            role="button"
            tabIndex={0}
            aria-label={`Volumen ${(nivel - 1) * 25}%`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") manejarClick(nivel);
            }}
          />
        ))}
      </div>
      <div className="etiqueta">Volumen: {porcentaje}%</div>
    </div>
  );
}