import React from 'react';

function Features() {
  return (
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
  );
}

export default Features;
