import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSelection.css';

const LoginSelection = () => {
    const navigate = useNavigate();

    // Função para lidar com o login do professor
    const handleLoginProfessor = (e) => {
        e.preventDefault();
        // logica de validação de email/senha
        alert('Login como professor realizado com sucesso! ');
        navigate('/professor/home');
    };

    // Função para lidar com o login do aluno
    const handleLoginAluno = (e) => {
        e.preventDefault();
        // logica de validação de email/senha
        alert('Login como aluno realizado com sucesso! ');
        navigate('/aluno/home');
    };

    return (
        <div className="login-selection-container">
            <div className="selection-box">
                <h2 className="selection-title">
                    <i className="fas fa-graduation-cap me-2"></i>Acesse o EduCollab
                </h2>
                
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" placeholder="digite seu email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" className="form-control" placeholder="digite sua senha" required />
                    </div>
                    
                    <div className="button-group">
                        <button onClick={handleLoginProfessor} className="login-button professor-btn">
                            <i className="fas fa-chalkboard-teacher me-2"></i>
                            Entrar como Professor
                        </button>
                        <button onClick={handleLoginAluno} className="login-button student-btn">
                            <i className="fas fa-user-graduate me-2"></i>
                            Entrar como Aluno
                        </button>
                    </div>
                </form>

                <a href="/" className="back-link">← Voltar para a página inicial</a>
            </div>
        </div>
    );
};

export default LoginSelection;