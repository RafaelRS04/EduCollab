import React, { useState } from 'react';

function QuestaoAluno({ questao, index }) {
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [feedback, setFeedback] = useState('');

  const verificarResposta = () => {
    if (!respostaSelecionada) {
      setFeedback(<div className="alert alert-warning p-2">Selecione uma alternativa!</div>);
      return;
    }

    if (respostaSelecionada === questao.resposta) {
      setFeedback(<div className="alert alert-success p-2"><strong>Parabéns!</strong> Resposta Correta!</div>);
    } else {
      setFeedback(<div className="alert alert-danger p-2"><strong>Ops!</strong> Resposta Incorreta. A resposta certa é a <strong>{questao.resposta}</strong>.</div>);
    }
  };

  const questaoId = `q-${questao.id}`;

  return (
    <div className="col-md-6">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <span className="badge bg-primary mb-2">{questao.materia}</span>
          <p className="card-text fw-bold">{index + 1}. {questao.enunciado}</p>
          <div>
            {questao.alternativas.map((alt, i) => {
              const alternativeValue = String.fromCharCode(65 + i);
              return (
                <div className="form-check" key={i}>
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name={`${questaoId}-resp`} 
                    id={`${questaoId}-${i}`} 
                    value={alternativeValue}
                    onChange={() => setRespostaSelecionada(alternativeValue)}
                  />
                  <label className="form-check-label" htmlFor={`${questaoId}-${i}`}>
                    {alternativeValue}) {alt}
                  </label>
                </div>
              );
            })}
          </div>
          <button className="btn btn-sm btn-success mt-3" onClick={verificarResposta}>
            <i className="bi bi-check2-circle"></i> Verificar
          </button>
          <div className="mt-2">{feedback}</div>
        </div>
      </div>
    </div>
  );
}

export default QuestaoAluno;
