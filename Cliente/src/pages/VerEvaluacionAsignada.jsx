import React, { useState, useEffect } from "react";
import './Formulario.css';

export const VerEvaluacionAsignada = () => {
  const [evaluacionesAsignadas, setEvaluacionesAsignadas] = useState([]);

  useEffect(() => {
    const obtenerEvaluacionesAsignadas = async () => {
      try {
        const response = await fetch("http://localhost:3001/obtener-evaluaciones-asignadas");
        if (response.ok) {
          const evaluacionesAsignadasData = await response.json();
          setEvaluacionesAsignadas(evaluacionesAsignadasData);
        } else {
          console.error("Error al obtener las evaluaciones asignadas:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error.message);
      }
    };

    obtenerEvaluacionesAsignadas();
  }, []);

  return (
    <div className="evaluaciones-asignadas-container">
      <h1 className="titulo">Evaluaciones Asignadas</h1>
      <ul>
        {evaluacionesAsignadas.map((asignacion, index) => (
          <li key={index}>
            <strong>Estudiante:</strong> {asignacion.estudiante.nombre} <br />
            <strong>Evaluación:</strong> {asignacion.evaluacion.nombre} <br />
            <strong>Fecha de Asignación:</strong> {asignacion.fechaAsignacion}
          </li>
        ))}
      </ul>
    </div>
  );
};


