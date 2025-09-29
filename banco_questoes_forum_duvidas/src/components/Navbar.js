import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ title, backTo, backText }) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#6A1B9A' }}>
      <div className="container">
        {backTo && (
          <Link className="navbar-brand text-white" to={backTo}>
            ← {backText || 'Voltar'}
          </Link>
        )}
        <span className="navbar-text text-white fw-bold mx-auto">
          {title}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
