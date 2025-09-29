import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfessorQuestoes from './pages/ProfessorQuestoes';
import AlunoQuestoes from './pages/AlunoQuestoes';
import Forum from './pages/Forum';
import TopicoDetalhe from './pages/TopicoDetalhe';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professor-questoes" element={<ProfessorQuestoes />} />
          <Route path="/aluno-questoes" element={<AlunoQuestoes />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/topico/:topicoId" element={<TopicoDetalhe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
