import React, { useState } from "react";

export const Inicio = () => {
  const [bienvenidaVisible, setBienvenidaVisible] = useState(true);

  const ocultarBienvenida = () => {
    setBienvenidaVisible(false);
  };

  return (
    <div>
      {bienvenidaVisible ? (
        <>
          <h1>Bienvenido al Sistema de Evaluación Estudiantil</h1>
          
        </>
      ) : (
        <>
          <h2>Evaluación en curso</h2>
         
        </>
      )}
    </div>
  );
};
