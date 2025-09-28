import React, { useState } from 'react';

// Recebe a prop 'onClose' para poder se fechar
function Login({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Login simulado com sucesso!\nEmail: ${email}`);
    onClose(); // Fecha o modal após o submit
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-sign-in-alt me-2"></i>Entrar no EduCollab
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                <i className="fas fa-sign-in-alt me-2"></i>Entrar
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0">Não tem uma conta?
                <a href="#" onClick={onSwitchToRegister}> Cadastre-se aqui</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;