const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
const PORT = 3001;
const EVALUACIONES_FILE = "evaluaciones.json";
const ESTUDIANTES_FILE = "estudiantes.json";

app.use(bodyParser.json());
app.use(cors());

app.get("/obtener-evaluaciones", async (req, res) => {
  try {
    const data = await fs.readFile(EVALUACIONES_FILE, "utf-8");
    const evaluaciones = JSON.parse(data);
    res.status(200).json(evaluaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las evaluaciones." });
  }
});
app.post("/guardar-estudiante", async (req, res) => {
  try {
    const nuevoEstudiante = req.body;

    // Lee el archivo actual de estudiantes (si existe)
    let estudiantes = [];
try {
  const data = await fs.readFile(ESTUDIANTES_FILE, "utf-8");
  estudiantes = JSON.parse(data);

  if (!Array.isArray(estudiantes)) {
    // Si no es un array, inicialízalo como un array vacío
    estudiantes = [];
  }
} catch (error) {
  // El archivo podría no existir todavía
}

// Ahora puedes usar push de manera segura
estudiantes.push(nuevoEstudiante);


    // Escribe los estudiantes actualizados en el archivo
    await fs.writeFile(
      ESTUDIANTES_FILE,
      JSON.stringify(estudiantes, null, 2),
      "utf-8"
    );

    res.status(200).json({ message: "Estudiante creado con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el estudiante." });
  }
});

app.post("/guardar-evaluacion", async (req, res) => {
  try {
    const nuevaEvaluacion = req.body;

    // Lee el archivo actual de evaluaciones (si existe)
    let evaluaciones = [];
    try {
      const data = await fs.readFile(EVALUACIONES_FILE, "utf-8");
      evaluaciones = JSON.parse(data);
    } catch (error) {
      // El archivo podría no existir todavía
    }

    // Agrega la nueva evaluación
    evaluaciones.push(nuevaEvaluacion);

    // Escribe las evaluaciones actualizadas en el archivo
    await fs.writeFile(
      EVALUACIONES_FILE,
      JSON.stringify(evaluaciones, null, 2),
      "utf-8"
    );

    res.status(200).json({ message: "Evaluación guardada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la evaluación." });
  }
});
app.get("/obtener-estudiantes", async (req, res) => {
  try {
    const data = await fs.readFile(ESTUDIANTES_FILE, "utf-8");
    const estudiantes = JSON.parse(data);
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los estudiantes." });
  }
});

app.post("/asignar-evaluacion", async (req, res) => {
  try {
    const { indiceEstudiante, indiceEvaluacion } = req.body;

    // Lee los archivos actuales de estudiantes y evaluaciones
    let estudiantes = [];
    let evaluaciones = [];
    let asignaciones = [];

    try {
      const estudiantesData = await fs.readFile(ESTUDIANTES_FILE, "utf-8");
      estudiantes = JSON.parse(estudiantesData);

      const evaluacionesData = await fs.readFile(EVALUACIONES_FILE, "utf-8");
      evaluaciones = JSON.parse(evaluacionesData);

      // Intenta leer el archivo de asignaciones
      try {
        const asignacionesData = await fs.readFile("asignaciones.json", "utf-8");
        asignaciones = JSON.parse(asignacionesData);
      } catch (error) {
        // El archivo podría no existir todavía
      }
    } catch (error) {
      // Maneja errores de lectura de archivos
      console.error(error);
      res.status(500).json({ error: "Error al leer datos." });
      return;
    }

    // Verifica que los índices proporcionados estén dentro de los límites
    if (
      indiceEstudiante < 0 ||
      indiceEstudiante >= estudiantes.length ||
      indiceEvaluacion < 0 ||
      indiceEvaluacion >= evaluaciones.length
    ) {
      res.status(404).json({ error: "Índices fuera de los límites." });
      return;
    }

    // Asigna la evaluación al estudiante
    if (!estudiantes[indiceEstudiante].evaluaciones) {
      estudiantes[indiceEstudiante].evaluaciones = [];
    }

    const evaluacionAsignada = {
      estudiante: {
        id: estudiantes[indiceEstudiante].id,
        nombre: estudiantes[indiceEstudiante].nombre,
        // Otras propiedades necesarias, pero evitando 'evaluaciones'
      },
      evaluacion: evaluaciones[indiceEvaluacion],
      fechaAsignacion: new Date().toISOString(),
    };
    

    estudiantes[indiceEstudiante].evaluaciones.push(evaluacionAsignada);

    // Agrega la asignación al array de asignaciones
    asignaciones.push(evaluacionAsignada);

    // Actualiza los archivos de estudiantes y asignaciones
    await fs.writeFile(ESTUDIANTES_FILE, JSON.stringify(estudiantes, null, 2), "utf-8");
    await fs.writeFile("asignaciones.json", JSON.stringify(asignaciones, null, 2), "utf-8");

    res.status(200).json({ message: "Evaluación asignada al estudiante con éxito." });
  } catch (error) {
    // Maneja errores generales
    console.error(error);
    res.status(500).json({ error: "Error al asignar la evaluación." });
  }
});
app.get("/obtener-evaluaciones-asignadas", async (req, res) => {
  try {
    // Lee el archivo de asignaciones (si existe)
    const asignacionesData = await fs.readFile("asignaciones.json", "utf-8");
    const asignaciones = JSON.parse(asignacionesData);

    res.status(200).json(asignaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las evaluaciones asignadas." });
  }
});




app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
