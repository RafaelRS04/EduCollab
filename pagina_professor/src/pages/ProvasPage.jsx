import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

// define o componente da página de provas
function ProvasPage() {

  // -- ESTADOS DO COMPONENTE --
  // 'useState' cria as "memórias" do componente
  const [activeTab, setActiveTab] = useState('criar'); // controla qual aba está ativa

  // estados para a aba "criar questões"
  const [questoes, setQuestoes] = useState([]);
  const [enunciado, setEnunciado] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '']);
  const [resposta, setResposta] = useState('');

   // estados para a aba "gerar provas"
  const [numProvas, setNumProvas] = useState(1);
  const [numQuestoesPorProva, setNumQuestoesPorProva] = useState(5);
  const [provasGeradas, setProvasGeradas] = useState([]);

  // estados para a aba "corrigir prova"
  const [codigoProvaInput, setCodigoProvaInput] = useState('');
  const [provaParaCorrigir, setProvaParaCorrigir] = useState(null);
  const [respostasAluno, setRespostasAluno] = useState([]);
  const [notaFinal, setNotaFinal] = useState(null);
 const [correctionDetails, setCorrectionDetails] = useState([]); 

 
  // -- FUNÇÕES DE LÓGICA --

// 'useEffect': é um "vigia". Ele roda toda vez que o 'codigoProvaInput' muda, procurando a prova correspondente na lista de provas geradas.
  useEffect(() => {
    const provaEncontrada = provasGeradas.find(p => p.codigo === codigoProvaInput);
    setProvaParaCorrigir(provaEncontrada || null);
    if (provaEncontrada) { setRespostasAluno(new Array(provaEncontrada.questoes.length).fill('')); }
    else { setRespostasAluno([]); }
    setNotaFinal(null);
  }, [codigoProvaInput, provasGeradas]);

  // // 'handle...': funções que são executadas em resposta a eventos do usuário 

  const handleAlternativaChange = (index, valor) => {
    const novasAlternativas = [...alternativas];
    novasAlternativas[index] = valor;
    setAlternativas(novasAlternativas);
  };

  const handleSubmitQuestao = (event) => {
    event.preventDefault();
    const novaQuestao = { id: Date.now(), enunciado, alternativas, resposta };
    setQuestoes([...questoes, novaQuestao]);
    setEnunciado(''); setAlternativas(['', '', '', '']); setResposta('');
  };

  const handleGerarProvas = () => {
    if (questoes.length < numQuestoesPorProva) {
      alert(`Você solicitou ${numQuestoesPorProva} questões por prova, mas só existem ${questoes.length} cadastradas.`);
      return;
    }
    const novasProvas = [];
    for (let i = 0; i < numProvas; i++) {
      const codigo = "PROVA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const questoesSorteadas = [...questoes].sort(() => 0.5 - Math.random()).slice(0, numQuestoesPorProva);
      novasProvas.push({ codigo, questoes: questoesSorteadas });
    }
    setProvasGeradas(novasProvas);
  };

const handleCorrigirProva = (event) => {
  event.preventDefault();
  let acertos = 0;
  const details = []; // Array temporário para os detalhes

  provaParaCorrigir.questoes.forEach((q, i) => {
    const respostaAluno = respostasAluno[i];
    const respostaCorreta = q.resposta;
    const isCorrect = respostaAluno === respostaCorreta;

    if (isCorrect) {
      acertos++;
    }

    details.push({
      enunciado: q.enunciado,
      alunoResposta: respostaAluno,
      respostaCorreta: respostaCorreta,
      isCorrect: isCorrect,
    });
  });
  
  const nota = (acertos / provaParaCorrigir.questoes.length * 10).toFixed(1);
  setNotaFinal(nota);
  setCorrectionDetails(details); // Salva os detalhes no estado
};

  const handleRespostaAlunoChange = (index, valor) => {
  const novasRespostas = [...respostasAluno];
  novasRespostas[index] = valor;
  setRespostasAluno(novasRespostas);
};

  const handleBaixarPdf = (prova) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Prova - Código: ${prova.codigo}`, 10, 10);
    doc.setFontSize(12);
    doc.text("Nome:", 10, 25);
    doc.line(25, 25, 150, 25);
    doc.text("Data: ___/___/___", 10, 30);
    let y = 45;
    prova.questoes.forEach((q, idx) => {
      const enunciadoLines = doc.splitTextToSize(`${idx + 1}) ${q.enunciado}`, 180);
      doc.text(enunciadoLines, 10, y);
      y += (enunciadoLines.length * 6);
      q.alternativas.forEach((alt, j) => {
        const alternativaLetra = String.fromCharCode(65 + j);
        const alternativaLines = doc.splitTextToSize(`${alternativaLetra}) ${alt}`, 170);
        doc.text(alternativaLines, 15, y);
        y += (alternativaLines.length * 6);
      });
      y += 5;
      if (y > 280) { doc.addPage(); y = 10; }
    });
    doc.save(`${prova.codigo}.pdf`);
  };

    //-- ESTRUTURA VISUAL --

  return (
    <main className="page-container">
      <div className="page-header">
        <div className="page-header-icon"><i className="bi bi-book-half"></i></div>
        <div className="page-header-title">
          <h2>Sistema de Provas</h2>
          <p>Crie questões, gere provas e corrija automaticamente</p>
        </div>
      </div>
 {/* container das abas de navegação. clicar em um botão muda o estado 'activeTab' */}
      <div className="tabs-container">
        <button className={`tab-button ${activeTab === 'criar' ? 'active' : ''}`} onClick={() => setActiveTab('criar')}>Criar Questões</button>
        <button className={`tab-button ${activeTab === 'gerar' ? 'active' : ''}`} onClick={() => setActiveTab('gerar')}>Gerar Provas</button>
        <button className={`tab-button ${activeTab === 'corrigir' ? 'active' : ''}`} onClick={() => setActiveTab('corrigir')}>Corrigir Prova</button>
      </div>

       {/* eenderização condicional: mostra o conteúdo da aba que está ativa no estado 'activeTab' */}

        {/* conteúdo da aba "criar questões" */}
      {activeTab === 'criar' && ( 
        <>
          <div className="card">
              {/* formulário para adicionar uma nova questão*/}
            <h5><i className="bi bi-plus-circle me-2"></i> Adicionar Questão</h5>
            <form onSubmit={handleSubmitQuestao} className="mt-3">
              <div className="mb-3"><label className="form-label">Enunciado da questão</label><textarea className="form-control" rows="3" placeholder="Digite o enunciado da questão" required value={enunciado} onChange={(e) => setEnunciado(e.target.value)} /></div>
              <div className="row g-3 mb-3">
                <div className="col-md-6"><label className="form-label">Alternativa A</label><input type="text" className="form-control" placeholder="Alternativa A" required value={alternativas[0]} onChange={(e) => handleAlternativaChange(0, e.target.value)} /></div>
                <div className="col-md-6"><label className="form-label">Alternativa B</label><input type="text" className="form-control" placeholder="Alternativa B" required value={alternativas[1]} onChange={(e) => handleAlternativaChange(1, e.target.value)} /></div>
                <div className="col-md-6"><label className="form-label">Alternativa C</label><input type="text" className="form-control" placeholder="Alternativa C" required value={alternativas[2]} onChange={(e) => handleAlternativaChange(2, e.target.value)} /></div>
                <div className="col-md-6"><label className="form-label">Alternativa D</label><input type="text" className="form-control" placeholder="Alternativa D" required value={alternativas[3]} onChange={(e) => handleAlternativaChange(3, e.target.value)} /></div>
              </div>
              <div className="mb-3"><label className="form-label">Resposta correta</label><select className="form-select" required value={resposta} onChange={(e) => setResposta(e.target.value)}><option value="">Selecione a resposta correta</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option></select></div>
              <button type="submit" className="btn btn-primary w-100"><i className="bi bi-plus-lg me-2"></i> Adicionar Questão</button>
            </form>
          </div>
          <div className="card mt-4">
            {/* lista de questões já cadastradas */}
            <h5>Questões Cadastradas ({questoes.length})</h5>
            {questoes.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-file-earmark-text"></i>
                <h5>Nenhuma questão cadastrada ainda</h5>
                <p>Adicione sua primeira questão usando o formulário acima.</p>
              </div>
            ) : (
              <ul className="list-group list-group-flush mt-3">{questoes.map((q, index) => <li key={q.id} className="list-group-item"><b>{index + 1}) {q.enunciado}</b> (Correta: {q.resposta})</li>)}</ul>
            )}
          </div>
        </>
      )}
{/* conteúdo da aba "gerar provas" */}
      {activeTab === 'gerar' && (
        <>
          <div className="card">
            {/* formulário para configurar e gerar as provas */}
            <h5><i className="bi bi-gear me-2"></i> Configurações da Prova</h5>
            <div className="row g-3 align-items-end mt-2">
              <div className="col-md-4"><label className="form-label">Quantidade de provas</label><input type="number" className="form-control" min="1" value={numProvas} onChange={(e) => setNumProvas(parseInt(e.target.value))} /></div>
              <div className="col-md-4"><label className="form-label">Questões por prova</label><input type="number" className="form-control" min="1" value={numQuestoesPorProva} onChange={(e) => setNumQuestoesPorProva(parseInt(e.target.value))} /></div>
              <div className="col-md-4"><button className="btn btn-success w-100" onClick={handleGerarProvas}>Gerar Provas</button></div>
            </div>
          </div>
          {/* mapeia e exibe as provas que foram geradas */}
          {provasGeradas.map((prova, index) => (<div key={prova.codigo} className="card mt-4"><h5>Prova {index + 1} - Código: {prova.codigo}</h5>{prova.questoes.map((q, idx) => (<div key={idx} className="mt-3 border-bottom pb-2"><p className="mb-1"><b>{idx + 1})</b> {q.enunciado}</p><small>A) {q.alternativas[0]}<br/>B) {q.alternativas[1]}<br/>C) {q.alternativas[2]}<br/>D) {q.alternativas[3]}</small></div>))}<button className="btn btn-primary mt-3" onClick={() => handleBaixarPdf(prova)}>Baixar PDF</button></div>))}
        </>
      )}

  {/* conteúdo da aba "corrigir rova" */}
  {activeTab === 'corrigir' && (
  <div className="card">
    <h5><i className="bi bi-check2-circle me-2"></i> Corrigir Prova</h5>

    {/* se a nota final AINDA NÃO foi calculada, mostra o formulário */}
    {notaFinal === null ? (
      <form onSubmit={handleCorrigirProva} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Código da prova</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Digite o código da prova" 
            required 
            value={codigoProvaInput} 
            onChange={(e) => setCodigoProvaInput(e.target.value.toUpperCase())} 
          />
        </div>
        {provaParaCorrigir && (
          <div>
            {provaParaCorrigir.questoes.map((q, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Questão {index + 1}</label>
                <select className="form-select" required value={respostasAluno[index]} onChange={(e) => handleRespostaAlunoChange(index, e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="A">A</option><option value="B">B</option>
                  <option value="C">C</option><option value="D">D</option>
                </select>
              </div>
            ))}
            <button type="submit" className="btn btn-primary mt-2">Corrigir</button>
          </div>
        )}
      </form>
    ) : (
      // se a nota final JÁ FOI calculada, mostra os resultados
      <div className="mt-4">
        <h4 className="mb-4">Resultado da Correção - Nota Final: <strong>{notaFinal}</strong></h4>
        
        {correctionDetails.map((detail, index) => (
          <div key={index} className="correction-detail-item">
            <h6>Questão {index + 1}: {detail.enunciado}</h6>
            <div className={`feedback-item ${detail.isCorrect ? 'feedback-certo' : 'feedback-errado'}`}>
              <span>Sua resposta: {detail.alunoResposta}</span>
              {detail.isCorrect ? (
                <span className="fw-bold">✔ Certo</span>
              ) : (
                <span className="fw-bold">✖ Errado</span>
              )}
            </div>
            {!detail.isCorrect && (
              <div className="feedback-item feedback-correta">
                <span>Resposta correta: {detail.respostaCorreta}</span>
              </div>
            )}
          </div>
        ))}
        
        <button 
          className="btn btn-secondary mt-4" 
          onClick={() => {
            setNotaFinal(null);
            setCorrectionDetails([]);
            setCodigoProvaInput('');
          }}
        >
          Corrigir Outra Prova
        </button>
      </div>
    )}
  </div>
)}
    </main>
  );
}

export default ProvasPage;