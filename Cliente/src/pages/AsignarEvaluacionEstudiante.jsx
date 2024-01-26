import { useState, useEffect } from "react";
import './Formulario.css';

export const AsignarEvaluacionEstudiante = () => {
  const [datosAsignacion, setDatosAsignacion] = useState({
    indiceEstudiante: "",
    indiceEvaluacion: "",
  });
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    // Aquí realizas las solicitudes al servidor para obtener las evaluaciones y estudiantes
    // Puedes utilizar la ruta "/obtener-evaluaciones" y "/obtener-estudiantes" en tu servidor

    // Ejemplo:
    const obtenerEvaluaciones = async () => {
      try {
        const response = await fetch("http://localhost:3001/obtener-evaluaciones");
        if (response.ok) {
          const evaluacionesData = await response.json();
          setEvaluaciones(evaluacionesData);
        } else {
          console.error("Error al obtener las evaluaciones:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error.message);
      }
    };

    const obtenerEstudiantes = async () => {
      try {
        const response = await fetch("http://localhost:3001/obtener-estudiantes");
        if (response.ok) {
          const estudiantesData = await response.json();
          setEstudiantes(estudiantesData);
        } else {
          console.error("Error al obtener los estudiantes:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error.message);
      }
    };

    obtenerEvaluaciones();
    obtenerEstudiantes();
  }, []);

  const handleIndiceEstudianteChange = (e) => {
    setDatosAsignacion({
      ...datosAsignacion,
      indiceEstudiante: e.target.value,
    });
  };

  const handleIndiceEvaluacionChange = (e) => {
    setDatosAsignacion({
      ...datosAsignacion,
      indiceEvaluacion: e.target.value,
    });
  };

  const asignarEvaluacionEnBackend = async () => {
    try {
      const response = await fetch("http://localhost:3001/asignar-evaluacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosAsignacion),
      });

      if (response.ok) {
        console.log("Evaluación asignada con éxito al estudiante en el servidor.");
      } else {
        console.error("Error al asignar la evaluación al estudiante en el servidor:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error.message);
    }
  };

  return (
    <div className="formulario-container">
      <h1 className="titulo">Asignar Evaluación a Estudiante</h1>

      <label className="label">
        Estudiante:
        <select value={datosAsignacion.indiceEstudiante} onChange={handleIndiceEstudianteChange} className="select">
          <option value="" disabled>Selecciona un estudiante</option>
          {estudiantes.map((estudiante, index) => (
            <option key={index} value={index}>{estudiante.nombre}</option>
          ))}
        </select>
      </label>

      <label className="label">
        Evaluación:
        <select value={datosAsignacion.indiceEvaluacion} onChange={handleIndiceEvaluacionChange} className="select">
          <option value="" disabled>Selecciona una evaluación</option>
          {evaluaciones.map((evaluacion, index) => (
            <option key={index} value={index}>{evaluacion.nombre}</option>
          ))}
        </select>
      </label>

      <button onClick={asignarEvaluacionEnBackend} className="boton-guardar">
        Asignar Evaluación
      </button>
    </div>
  );
};
