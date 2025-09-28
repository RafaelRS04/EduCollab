import React from 'react';
import { Link } from 'react-router-dom';

// Define o componente da página inicial
function HomePage() {
  return (
    // '<main>' é a tag principal que envolve todo o conteúdo da página.
    <main className="page-container">

      {/* Seção 1: mensagem de boas-vindas (Hero) */}
      <section className="hero-section">
        <div className="hero-badge">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Plataforma Educacional
        </div>
        <h1 className="hero-title">
          Bem-vindo ao<br />
          {/* o 'span' com a classe "hero-subtitle-gradient" aplica um efeito de cor gradiente ao texto. */}
          <span className="hero-subtitle-gradient">Painel do Professor</span>
        </h1>
        <p className="hero-description">
          Gerencie suas aulas, crie provas personalizadas e conecte-se com outros
          educadores em uma plataforma completa e moderna.
        </p>
      </section>

      {/* Seção 2: cards de funcionalidade */}
      <section className="function-cards-section">
        <div className="row g-4 justify-content-center">  {/* 'div.row' ajuda a organizar os cards em um grid responsivo. */}
          {/* card sistema de provas */}
          <div className="col-lg-6">
            <div className="function-card card-provas">
              <div className="card-icon"><i className="bi bi-book-half"></i></div>
              <h4 className="card-title-func">Sistema de Provas</h4>
              <p className="card-description-func">
                Crie questões, gere provas automaticamente e corrija com facilidade usando nossa ferramenta inteligente.
              </p>
              {/* o componente 'Link' funciona como um <a>, mas navega para a rota "/provas" sem recarregar a página. */}
              <Link to="/provas" className="btn btn-primary mt-auto">
                Acessar <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* aard fórum de professores */}
          <div className="col-lg-6">
            <div className="function-card card-forum">
              <div className="card-icon"><i className="bi bi-chat-dots-fill"></i></div>
              <h4 className="card-title-func">Fórum de Professores</h4>
              <p className="card-description-func">
                Compartilhe experiências, tire dúvidas e colabore com outros educadores em nossa comunidade ativa.
              </p>
              {/* vai para a rota "/forum". */}
              <Link to="/forum" className="btn btn-success mt-auto">
                Acessar <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* card banco de questões */}
          <div className="col-lg-6">
            <div className="function-card card-banco">
              <div className="card-icon"><i className="bi bi-collection"></i></div>
              <h4 className="card-title-func">Banco de Questões</h4>
              <p className="card-description-func">
                Adicione e organize suas questões em um banco centralizado e crie testes para seus alunos estudarem.
              </p>
              <a href="#" className="btn btn-banco mt-auto">
                Acessar <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage; // exporta o componente para que possa ser usado no App.js