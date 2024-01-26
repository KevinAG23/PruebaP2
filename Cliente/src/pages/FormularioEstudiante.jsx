import { useState } from "react";
import './FormularioEvaluacion.css'; 

export const FormularioEstudiante  = () => {
  const [estudiante, setEstudiante] = useState({
    nombre: "",
    cedula: "",
    telefono: ""
  });

  const handleNombreChange = (e) => {
    setEstudiante({
      ...estudiante,
      nombre: e.target.value,
    });
  };

  const handleCedulaChange = (e) => {
    setEstudiante({
      ...estudiante,
      cedula: e.target.value,
    });
  };

  const handleTelefonoChange = (e) => {
    setEstudiante({
      ...estudiante,
      telefono: e.target.value,
    });
  };

  const guardarEstudianteEnBackend = async () => {
    try {
      const response = await fetch("http://localhost:3001/guardar-estudiante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estudiante),
      });
  
      if (response.ok) {
        console.log("Estudiante creado con éxito en el servidor.");
      } else {
        console.error("Error al crear el estudiante en el servidor:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error.message);
    }
  };
  

  return (
    <div className="formulario-container">
      <h1 className="titulo">Formulario de Estudiante</h1>
      <label className="label">
        Nombre del Estudiante:
        <input
          type="text"
          value={estudiante.nombre}
          onChange={handleNombreChange}
          className="input"
        />
      </label>
      <label className="label">
        Cédula del Estudiante:
        <input
          type="text"
          value={estudiante.cedula}
          onChange={handleCedulaChange}
          className="input"
        />
      </label>
      <label className="label">
        Teléfono del Estudiante:
        <input
          type="text"
          value={estudiante.telefono}
          onChange={handleTelefonoChange}
          className="input"
        />
      </label>

      <div className="resumen-container">
        <h2 className="titulo">Resumen:</h2>
        <p>Nombre del Estudiante: {estudiante.nombre}</p>
        <p>Cédula del Estudiante: {estudiante.cedula}</p>
        <p>Teléfono del Estudiante: {estudiante.telefono}</p>
      </div>
      <button onClick={() => guardarEstudianteEnBackend(estudiante)} className="boton-guardar">
        Crear Estudiante
      </button>
    </div>
  );
};

