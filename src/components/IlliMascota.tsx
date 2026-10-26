import React from 'react';
import './IlliMascota.css';

export const IlliMascota: React.FC = () => {
  return (
    <div className="illi-widget" title="Illi - Mascota de la Radio">
      <video autoPlay loop muted playsInline className="illi-video">

        <source src="/videos/illi-saludando.webm" type="video/webm" />
        <source src="Radio_AM/src/assets/Illi-saludando.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
        
      </video>
    </div>
  );
};

export default IlliMascota;