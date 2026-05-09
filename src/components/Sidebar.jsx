import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3 shadow" style={{ width: '250px', minHeight: '100vh' }}>
      <h2 className="text-center mb-4 text-primary">LUAN</h2>
      <hr />
      <nav className="nav flex-column">
        <Link to="/" className="nav-link text-white mb-2">
          <i className="bi bi-house-door me-2"></i> Inicio
        </Link>
        <Link to="/equipos" className="nav-link text-white mb-2">
          <i className="bi bi-laptop me-2"></i> Gestionar Equipos
        </Link>
        <Link to="/clientes" className="nav-link text-white mb-2">
          <i className="bi bi-people me-2"></i> Gestionar Clientes
        </Link>
      </nav>
      <div className="mt-auto pt-5 text-secondary text-center">
        <small>v1.0 - SENA Project</small>
      </div>
    </div>
  );
};

export default Sidebar;