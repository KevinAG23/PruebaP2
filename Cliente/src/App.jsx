// App.jsx
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Inicio } from "./pages/Inicio";
import { Formulario } from "./pages/Formulario";
import { FormularioEstudiante } from "./pages/FormularioEstudiante";
import { AsignarEvaluacionEstudiante } from "./pages/AsignarEvaluacionEstudiante"; // Importa el nuevo componente
import { VerEvaluacionAsignada } from "./pages/VerEvaluacionAsignada";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/formulario-estudiante" element={<FormularioEstudiante />} />
            <Route path="/asignar-evaluacion" element={<AsignarEvaluacionEstudiante />} /> {/* Agrega la ruta para el nuevo componente */}
            <Route path="/ver-evaluacion" element={<VerEvaluacionAsignada />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
