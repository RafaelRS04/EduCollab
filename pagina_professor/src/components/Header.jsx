import React from 'react';
import { Link } from 'react-router-dom';

// Componente de barra de navegação que recebe o perfil do professor para exibi-lo
function Header({ perfil }) {
  return (
    <header className="main-header">
      <Link to="/" className="header-logo">
        <span className="logo-icon">E</span>
        <span className="logo-text">EduCollab</span>
      </Link>

      <div className="header-profile">
        <div className="profile-info">
          <div className="name">{perfil.nome}</div>
          <div className="role">Professor</div>
        </div>
        <img src={perfil.foto} alt="Avatar do Professor" className="profile-avatar" />
        <Link to="/perfil" className="profile-settings" title="Editar Perfil">
          <i className="bi bi-gear"></i>
        </Link>
      </div>
    </header>
  );
}

export default Header; // exporta o componente para que ele seja importado e utilizado pelo App.js