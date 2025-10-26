import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();

    const [selectedUserType, setSelectedUserType] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [formData, setFormData] = useState({
        registerName: '',
        registerEmail: '',
        registerPhone: '',
        registerPassword: '',
        studentLevel: '',
        teacherArea: '',
        teacherLevel: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        alert(`Cadastro realizado com sucesso! (Simulação)\nTipo: ${selectedUserType}\nNome: ${formData.registerName}`);
        if (selectedUserType === 'teacher') {
            navigate('/professor/home');
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
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
                                <button className="btn btn-primary-custom btn-custom" data-bs-toggle="modal" data-bs-target="#registerModal">
                                    <i className="fas fa-rocket me-2"></i>Começar Agora
                                </button>
                                <Link to="/login-selection" className="btn btn-outline-custom btn-custom">
                                    <i className="fas fa-sign-in-alt me-2"></i>Já tenho conta
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <i className="fas fa-users" style={{ fontSize: '15rem', opacity: 0.3 }}></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="recursos">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="display-4 fw-bold text-dark mb-3">Por que escolher o EduCollab?</h2>
                            <p className="lead text-muted">Descubra como nossa plataforma revoluciona a educação</p>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card">
                                <i className="fas fa-chalkboard-teacher feature-icon"></i>
                                <h4 className="fw-bold mb-3">Para Professores</h4>
                                <p className="text-muted">Compartilhe conhecimento, crie conteúdos colaborativos e conecte-se com outros educadores para enriquecer suas práticas pedagógicas.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <i className="fas fa-user-graduate feature-icon"></i>
                                <h4 className="fw-bold mb-3">Para Alunos</h4>
                                <p className="text-muted">Acesse materiais exclusivos, participe de discussões enriquecedoras e colabore com colegas em projetos educacionais.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <i className="fas fa-handshake feature-icon"></i>
                                <h4 className="fw-bold mb-3">Colaboração</h4>
                                <p className="text-muted">Ambiente seguro e estruturado para a troca de experiências entre todos os membros da comunidade educacional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Register Modal */}
            <div className="modal fade" id="registerModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><i className="fas fa-user-plus me-2"></i>Cadastrar no EduCollab</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleRegister}>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Você é:</label>
                                    <div className="user-type-selector">
                                        <div className={`user-type-card ${selectedUserType === 'student' ? 'active' : ''}`} onClick={() => setSelectedUserType('student')}>
                                            <i className="fas fa-user-graduate fa-2x mb-2"></i>
                                            <h6>Aluno</h6>
                                        </div>
                                        <div className={`user-type-card ${selectedUserType === 'teacher' ? 'active' : ''}`} onClick={() => setSelectedUserType('teacher')}>
                                            <i className="fas fa-chalkboard-teacher fa-2x mb-2"></i>
                                            <h6>Professor</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="registerName" className="form-label">Nome Completo</label>
                                        <input type="text" className="form-control" id="registerName" required value={formData.registerName} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="registerEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="registerEmail" required value={formData.registerEmail} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="registerPhone" className="form-label">Telefone</label>
                                        <input type="tel" className="form-control" id="registerPhone" required value={formData.registerPhone} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="registerPassword" className="form-label">Senha</label>
                                        <input type="password" className="form-control" id="registerPassword" required value={formData.registerPassword} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className={`conditional-fields ${selectedUserType === 'student' ? 'show' : ''}`}>
                                    <h6 className="fw-bold mb-3"><i className="fas fa-user-graduate me-2"></i>Informações do Aluno</h6>
                                    <div className="mb-3">
                                        <label htmlFor="studentLevel" className="form-label">Nível de Ensino</label>
                                        <select className="form-select" id="studentLevel" value={formData.studentLevel} onChange={handleChange}>
                                            <option value="">Selecione seu nível</option>
                                            <option value="ensino-medio">Ensino Médio</option>
                                            <option value="graduacao">Graduação</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={`conditional-fields ${selectedUserType === 'teacher' ? 'show' : ''}`}>
                                    <h6 className="fw-bold mb-3"><i className="fas fa-chalkboard-teacher me-2"></i>Informações do Professor</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="teacherArea" className="form-label">Área de Ensino</label>
                                            <select className="form-select" id="teacherArea" value={formData.teacherArea} onChange={handleChange}>
                                                <option value="">Selecione sua área</option>
                                                <option value="matematica">Matemática</option>
                                                <option value="portugues">Português</option>
                                                <option value="historia">História</option>
                                                <option value="geografia">Geografia</option>
                                                <option value="biologia">Biologia</option>
                                                <option value="quimica">Química</option>
                                                <option value="fisica">Física</option>
                                                <option value="ingles">Inglês</option>
                                                <option value="artes">Artes</option>
                                                <option value="educacao-fisica">Educação Física</option>
                                                <option value="filosofia">Filosofia</option>
                                                <option value="sociologia">Sociologia</option>
                                                <option value="outros">Outros</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="teacherLevel" className="form-label">Onde leciona</label>
                                            <select className="form-select" id="teacherLevel" value={formData.teacherLevel} onChange={handleChange}>
                                                <option value="">Selecione o nível</option>
                                                <option value="ensino-medio">Ensino Médio</option>
                                                <option value="graduacao">Graduação</option>
                                                <option value="ambos">Ambos</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="agreeTerms" required checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="agreeTerms">
                                        Concordo com os <a href="#">Termos de Uso</a>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={!selectedUserType || !agreeTerms}>
                                    <i className="fas fa-user-plus me-2"></i>Criar Conta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;