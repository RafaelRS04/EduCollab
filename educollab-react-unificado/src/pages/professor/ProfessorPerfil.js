import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer'; 

const ProfessorPerfil = () => {
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState({
        nome: '',
        telefone: '',
        email: '',
        area: '',
        materias: '',
        foto: 'https://via.placeholder.com/100'
    });

    useEffect(() => {
        const perfilSalvo = sessionStorage.getItem("perfilProfessor");
        if (perfilSalvo) {
            setPerfil(JSON.parse(perfilSalvo));
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPerfil(prevState => ({ ...prevState, [id]: value }));
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPerfil(prevState => ({ ...prevState, foto: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem("perfilProfessor", JSON.stringify(perfil));
        alert("Perfil atualizado com sucesso!");
        navigate('/professor/home');
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div style={{ flex: '1 0 auto', paddingBottom: '80px' }}>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <Link className="navbar-brand text-white" to="/professor/home">← Voltar</Link>
                        </div>
                    </nav>

                    <div className="container mt-5">
                        <h3 className="mb-4">Editar Perfil do Professor</h3>
                        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                            <div className="mb-3 text-center">
                                <img src={perfil.foto}
                                     className="rounded-circle mb-3"
                                     style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                     alt="Pré-visualização do Perfil" />
                                <input type="file" id="foto" className="form-control" onChange={handleFotoChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" id="nome" className="form-control" placeholder="Digite seu nome" required value={perfil.nome} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefone" className="form-label">Telefone</label>
                                <input type="tel" id="telefone" className="form-control" placeholder="(99) 99999-9999" value={perfil.telefone} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" id="email" className="form-control" placeholder="professor@email.com" required value={perfil.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">Área de Ensino</label>
                                <select id="area" className="form-select" required value={perfil.area} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    <option value="Ensino Médio">Ensino Médio</option>
                                    <option value="Graduação">Graduação</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="materias" className="form-label">Matérias que Leciona</label>
                                <input type="text" id="materias" className="form-control" placeholder="Ex: Matemática, Física" value={perfil.materias} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ProfessorPerfil;