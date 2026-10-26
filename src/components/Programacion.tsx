import "./Programacion.css";

interface Programa {
  id: number;
  nombre: string;
  hora: string;
}

interface ProgramacionProps {
  programas: Programa[];
}

export default function Programacion({ programas }: ProgramacionProps) {
  return (
    <div className="programacion">
      <h2 className="programacion-titulo">Siguiente Programación</h2>

      <ul className="programacion-lista">
        {programas.map((p, i) => (
          <li key={p.id} className={`programa ${i === 0 ? "proximo" : ""}`}>
            <span className="programa-nombre">{p.nombre}</span>
            <span className="programa-hora">{p.hora}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}