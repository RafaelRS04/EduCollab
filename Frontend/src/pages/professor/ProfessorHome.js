import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import ActionCard from '../../components/ActionCard'; 

const ProfessorHome = () => {
    const [perfil, setPerfil] = useState({ nome: 'Professor', foto: 'https://via.placeholder.com/40' });

    useEffect(() => {
        const perfilSalvo = sessionStorage.getItem("perfilProfessor");
        if (perfilSalvo) {
            setPerfil(JSON.parse(perfilSalvo));
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: '1 0 auto' }}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img id="fotoPerfil" src={perfil.foto} alt="Foto do Professor"
                                className="rounded-circle me-2" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                            <Link to="/professor/perfil" id="nomePerfil" className="navbar-brand mb-0">
                                {perfil.nome}
                            </Link>
                        </div>
                        <span className="navbar-text text-white fw-bold">
                            EduCollab - Professor
                        </span>
                    </div>
                </nav>

                <div className="container mt-5">
                    <div className="text-center mb-4">
                        <h2>Bem-vindo ao Painel do Professor</h2>
                        <p className="text-muted">Escolha uma das funcionalidades abaixo para começar:</p>
                    </div>

                    <div className="row g-4">
                       
                        <ActionCard
                            icon="bi bi-book-half text-primary"
                            title="Sistema de Provas"
                            text="Crie questões, gere provas personalizadas e corrija automaticamente."
                            linkTo="/professor/provas"
                            buttonText="Acessar"
                            buttonClass="btn-primary"
                        />
                        <ActionCard
                            icon="bi bi-chat-dots-fill text-success"
                            title="Fórum de Professores"
                            text="Compartilhe experiências, dúvidas e materiais com colegas."
                            linkTo="/professor/forum"
                            buttonText="Acessar"
                            buttonClass="btn-success"
                        />
                        <ActionCard
                            icon="bi bi-collection text-warning"
                            title="Banco de Questões"
                            text="Adicione e organize suas questões em um banco centralizado."
                            linkTo="/professor/banco-questoes"
                            buttonText="Acessar"
                            buttonClass="btn-warning text-white"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfessorHome;