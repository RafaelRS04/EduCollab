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
import ForumDuvidas from './pages/forum/ForumDuvidas';
import TopicoDetalhe from './pages/forum/TopicoDetalhe';

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
        <Route path="/professor/forum" element={<ForumDuvidas />} />

         {/* Rotas do Aluno */}
        <Route path="/aluno/home" element={<AlunoHome />} /> 
        <Route path="/aluno/banco-questoes" element={<BancoQuestoesAluno />} />
        <Route path="/aluno/forum" element={<ForumDuvidas />} />

        {/* Rotas do Fórum (acessíveis de forma geral) */}
        <Route path="/forum" element={<ForumDuvidas />} />
        <Route path="/forum/topico/:id" element={<TopicoDetalhe />} />
      </Routes>
    </Router>
  );
}

export default App;
