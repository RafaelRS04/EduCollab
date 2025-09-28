import React from 'react';

//recebe as funções 'onOpenRegister' e 'onOpenLogin' como "props"
function Herosection({ onOpenRegister, onOpenLogin }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="hero-title">EduCollab</h1>
            <p className="hero-subtitle">
              Conectando professores e alunos em um ambiente educacional colaborativo.
              Juntos, construímos o futuro da educação através da colaboração e troca de conhecimentos.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary-custom btn-custom" onClick={onOpenRegister}>
                <i className="fas fa-rocket me-2"></i>Começar Agora
              </button>
              <button className="btn btn-outline-custom btn-custom" onClick={onOpenLogin}>
                <i className="fas fa-sign-in-alt me-2"></i>Já tenho conta
              </button>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <i className="fas fa-users" style={{ fontSize: '15rem', opacity: '0.3' }}></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;