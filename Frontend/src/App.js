import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas Principais e de Login
import Home from './pages/Home';
import LoginSelection from './pages/login/LoginSelection';
import Register from './pages/register/Register';

// Páginas do Professor
import ProfessorHome from './pages/professor/ProfessorHome';
import ProfessorPerfil from './pages/professor/ProfessorPerfil';
import BancoQuestoesProfessor from './pages/professor/BancoQuestoesProfessor';
import SistemaProvas from './pages/professor/SistemaProvas';

// Páginas do Aluno
import AlunoHome from './pages/aluno/AlunoHome';
import BancoQuestoesAluno from './pages/aluno/BancoQuestoesAluno';

// Páginas do Fórum
import ForumDuvidasAluno from './pages/forumAluno/ForumDuvidasAluno';
import TopicoDetalheAluno from './pages/forumAluno/TopicoDetalheAluno';

import ForumDuvidasProfessor from './pages/forumProfessor/ForumDuvidasProfessor';
import TopicoDetalheProfessor from './pages/forumProfessor/TopicoDetalheProfessor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Principal */}
        <Route path="/" element={<Home />} />

        {/* Rota para a tela de seleção de Login */}
        <Route path="/login-selection" element={<LoginSelection />} />

        {/* Rota para a tela de seleção de Register */}
        <Route path="/register" element={<Register />} />

        {/* Rotas do Professor */}
        <Route path="/professor/home" element={<ProfessorHome />} />
        <Route path="/professor/perfil" element={<ProfessorPerfil />} />
        <Route path="/professor/banco-questoes" element={<BancoQuestoesProfessor />} />
        <Route path="/professor/provas" element={<SistemaProvas />} />
        <Route path="/professor/forumProfessor" element={<ForumDuvidasProfessor />} />

         {/* Rotas do Aluno */}
        <Route path="/aluno/home" element={<AlunoHome />} /> 
        <Route path="/aluno/banco-questoes" element={<BancoQuestoesAluno />} />
        <Route path="/aluno/forumAluno" element={<ForumDuvidasAluno />} />

         {/* Rotas do Fórum  */}
        <Route path="/forumAluno" element={<ForumDuvidasAluno />} />
        <Route path="/forum/topico/:id" element={<TopicoDetalheAluno />} />
        <Route path="/forumProfessor" element={<ForumDuvidasProfessor />} />
        <Route path="/forum/topico/:id" element={<TopicoDetalheProfessor />} />
      </Routes>
    </Router>
  );
}

export default App;
