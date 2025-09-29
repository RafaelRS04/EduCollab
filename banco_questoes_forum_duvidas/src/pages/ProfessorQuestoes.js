import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';

function ProfessorQuestoes() {
  const [questoes, setQuestoes] = useLocalStorage('bancoQuestoes', []);
  const [materia, setMateria] = useState('');
  const [enunciado, setEnunciado] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '']);
  const [respostaCorreta, setRespostaCorreta] = useState('');

  const handleAlternativaChange = (index, value) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas[index] = value;
    setAlternativas(novasAlternativas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!materia || !enunciado || alternativas.some(alt => alt === '') || !respostaCorreta) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const novaQuestao = { materia, enunciado, alternativas, resposta: respostaCorreta, id: Date.now() };
    setQuestoes([...questoes, novaQuestao]);
    // Limpar formulário
    setMateria('');
    setEnunciado('');
    setAlternativas(['', '', '', '']);
    setRespostaCorreta('');
  };

  const removerQuestao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
      setQuestoes(questoes.filter(q => q.id !== id));
    }
  };

  return (
    <>
      <Navbar title="Banco de Questões" backTo="/" backText="Voltar para Home" />
      <div className="container mt-5">
        <div className="card p-4 shadow-sm mb-5">
          <h4 className="mb-3"><i className="bi bi-plus-circle-fill me-2"></i> Adicionar Nova Questão</h4>
          <form onSubmit={handleSubmit}>
            {/* Inputs do formulário... */}
            <div className="mb-3">
              <label htmlFor="materia" className="form-label">Matéria</label>
              <input type="text" id="materia" className="form-control" value={materia} onChange={(e) => setMateria(e.target.value)} placeholder="Ex: Matemática" required />
            </div>
            <div className="mb-3">
              <label htmlFor="enunciado" className="form-label">Enunciado</label>
              <textarea id="enunciado" className="form-control" rows="3" value={enunciado} onChange={(e) => setEnunciado(e.target.value)} placeholder="Digite o enunciado da questão" required></textarea>
            </div>
            
            <label className="form-label">Alternativas</label>
            {alternativas.map((alt, index) => (
              <div className="input-group mb-2" key={index}>
                <span className="input-group-text">{String.fromCharCode(65 + index)}</span>
                <input type="text" className="form-control" value={alt} onChange={(e) => handleAlternativaChange(index, e.target.value)} placeholder={`Alternativa ${String.fromCharCode(65 + index)}`} required />
              </div>
            ))}

            <div className="mb-3">
              <label htmlFor="respostaCorreta" className="form-label">Resposta Correta</label>
              <select id="respostaCorreta" className="form-select" value={respostaCorreta} onChange={(e) => setRespostaCorreta(e.target.value)} required>
                <option value="">Selecione a correta...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <button type="submit" className="btn btn-roxo w-100">
              <i className="bi bi-check-circle-fill me-2"></i> Salvar Questão
            </button>
          </form>
        </div>

        <h4 className="mb-3"><i className="bi bi-collection-fill me-2"></i> Questões Cadastradas</h4>
        <div id="listaQuestoes" className="row g-4">
          {questoes.length === 0 ? (
            <p className="text-muted col-12">Nenhuma questão cadastrada ainda.</p>
          ) : (
            questoes.map((q) => (
              <div key={q.id} className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-subtitle mb-2 text-muted">Matéria: {q.materia}</h6>
                    <p className="card-text fw-bold">{q.enunciado}</p>
                    <ul className="list-unstyled">
                      {q.alternativas.map((alt, i) => <li key={i}><strong>{String.fromCharCode(65 + i)}:</strong> {alt}</li>)}
                    </ul>
                    <p className="text-success mt-auto">Resposta Correta: {q.resposta}</p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0 text-end">
                    <button className="btn btn-sm btn-danger" onClick={() => removerQuestao(q.id)}>
                      <i className="bi bi-trash-fill me-1"></i> Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ProfessorQuestoes;
