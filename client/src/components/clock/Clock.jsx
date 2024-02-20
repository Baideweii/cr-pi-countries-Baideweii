import './Clock.css';
import React, { useState, useEffect } from 'react';

function Clock() {
  const [rotate, setRotate] = useState(0); // Estado para almacenar el ángulo de rotación

  useEffect(() => {
    // Función para actualizar el ángulo de rotación cada segundo
    const interval = setInterval(() => {
      setRotate((prevRotate) => prevRotate + 30); // Incrementa el ángulo en 6 grados
    }, 60000); // Se ejecuta cada segundo

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <img src={`../src/images/clockborder.png`} alt="Borde del reloj" className='clockborder'/>
      </div>
      <div>
        <img
          src={`../src/images/clockinside.png`}
          className='clockinside' // Aplica la rotación al estilo
          alt="Interior del reloj"
          style={{ transform: `rotate(${rotate}deg)` }}
          />
      </div>
    </div>
  );
};

export default Clock;
