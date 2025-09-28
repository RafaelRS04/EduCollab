import React from 'react';
import { Link } from 'react-router-dom';

// Este componente representa a barra de navegação superior.
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Perfil do Professor */}
        <div className="d-flex align-items-center">
          <img 
            id="fotoPerfil" 
            src="https://via.placeholder.com/40" 
            alt="Foto do Professor"
            className="rounded-circle me-2" 
            style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
          />
          <Link to="/perfil" id="nomePerfil" className="navbar-brand mb-0">
    Professor
</Link>
        </div>

        {/* Logo */}
        <span className="navbar-text text-white fw-bold">
          EduCollab - Professor
        </span>
      </div>
    </nav>
  );
}

export default Navbar;