// Layout.jsx
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  const linkStyles = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '18px',
    margin: '0 15px',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, transform 0.3s',
  };

  const activeLinkStyles = {
    backgroundColor: '#2980b9',
    transform: 'scale(1.05)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <nav style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#3498db', padding: '10px', borderRadius: '8px' }}>
        <NavLink to="/" style={linkStyles} activeStyle={activeLinkStyles} end>
          Inicio
        </NavLink>
        <NavLink to="/formulario" style={linkStyles} activeStyle={activeLinkStyles}>
          Formulario
        </NavLink>
        <NavLink to="/formulario-estudiante" style={linkStyles} activeStyle={activeLinkStyles}>
          Formulario Estudiante
        </NavLink>
        <NavLink to="/asignar-evaluacion" style={linkStyles} activeStyle={activeLinkStyles}>
          Asignar Evaluación
        </NavLink>
        <NavLink to="/ver-evaluacion" style={linkStyles} activeStyle={activeLinkStyles}>
          Ver Evaluación
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
