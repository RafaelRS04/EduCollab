import React, { useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import QuestaoAluno from '../components/QuestaoAluno';
import Navbar from '../components/Navbar';

function AlunoQuestoes() {
  const [questoes] = useLocalStorage('bancoQuestoes', []);
  const [filtroMateria, setFiltroMateria] = useState('');

  const questoesFiltradas = useMemo(() => {
    if (!filtroMateria) {
      return questoes;
    }
    return questoes.filter(q => q.materia.toLowerCase().includes(filtroMateria.toLowerCase()));
  }, [questoes, filtroMateria]);

  return (
    <>
      <Navbar title="Questões para Estudo" backTo="/" backText="Voltar para Home"/>
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Teste seus conhecimentos!</h2>
          <p className="lead text-muted">Resolva as questões cadastradas pelos professores e prepare-se para as provas.</p>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Filtrar por matéria..."
              value={filtroMateria}
              onChange={(e) => setFiltroMateria(e.target.value)}
            />
          </div>
        </div>
        
        <div className="row g-4">
          {questoesFiltradas.length === 0 ? (
            <p className="text-muted col-12">Nenhuma questão encontrada.</p>
          ) : (
            questoesFiltradas.map((q, index) => (
              <QuestaoAluno key={q.id} questao={q} index={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AlunoQuestoes;
