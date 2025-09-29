import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <Navbar title="EduCollab" />
      <div className="container mt-5">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Bem-vindo ao EduCollab</h1>
            <p className="col-md-8 fs-4">
              Sua plataforma colaborativa para estudo. Acesse o banco de questões ou participe do fórum de dúvidas.
            </p>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Área do Professor</h2>
                <p className="card-text">Crie e gerencie o banco de questões para seus alunos.</p>
                {/* ALTERADO AQUI */}
                <Link to="/professor-questoes" className="btn btn-roxo">
                  Gerenciar Questões <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Área do Aluno</h2>
                <p className="card-text">Teste seus conhecimentos resolvendo as questões.</p>
                {/* ALTERADO AQUI */}
                <Link to="/aluno-questoes" className="btn btn-roxo">
                  Resolver Questões <i className="bi bi-pencil-fill ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12">
             <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Comunidade</h2>
                    <p className="card-text">Tire suas dúvidas e ajude outros colegas no fórum.</p>
                    {/* ALTERADO AQUI */}
                    <Link to="/forum" className="btn btn-roxo">
                        Acessar Fórum <i className="bi bi-chat-left-text-fill ms-2"></i>
                    </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
