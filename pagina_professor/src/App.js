

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; //  estilos principais

// importa os componentes reutilizáveis e as páginas da aplicação
import Header from './components/Header'; 
import HomePage from './pages/HomePage';
import ProvasPage from './pages/ProvasPage';
import ForumPage from './pages/ForumPage';
import PerfilPage from './pages/PerfilPage';

// define o componente principal 'App', que "guarda" de toda a aplicação
function App() {

  // --- ESTADO GLOBAL E LÓGICA ---
  // a lógica e os dados que precisam ser compartilhados entre várias páginas ficam aqui

  // 'perfil': estado que armazena os dados do professor (nome e foto)
  const [perfil, setPerfil] = useState({
    nome: 'Professor',
    foto: 'https://via.placeholder.com/40'
  });

  //Executa uma vez ao iniciar a aplicação para carregar os dados do perfil salvos no navegador garantindo que a sessão do usuário continue
  useEffect(() => {
    const dadosSalvos = sessionStorage.getItem("perfilProfessor");
    if (dadosSalvos) {
      setPerfil(JSON.parse(dadosSalvos));
    }
  }, []);

  // função para atualizar o perfil. ela é passada como 'prop'para a PerfilPage, permitindo que a página filha modifique o estado do componente pai.
  const handleUpdatePerfil = (novoPerfil) => {
    setPerfil(novoPerfil);
    sessionStorage.setItem("perfilProfessor", JSON.stringify(novoPerfil));
  };

  // --- ESTRUTURA VISUAL E ROTAS ---
  return (
    // Habilita o sistema de navegação (rotas) em toda a aplicação
    <Router> 
     
      {/* 'Header': renderiza o cabeçalho no topo de todas as páginas*/}
      <Header perfil={perfil} />

{/* define as diferentes "páginas" (rotas) da aplicação */}
      <Routes>
         {/* rota para a página inicial. Passa o 'perfil' para a HomePage */}
        <Route path="/" element={<HomePage perfil={perfil} />} />
         {/* rota para a página de provas */}
        <Route path="/provas" element={<ProvasPage />} />
        {/* rota para a página de forum */}
        <Route path="/forum" element={<ForumPage />} />
        {/* rota para a página de perfil. passa a função 'handleUpdatePerfil' para que a página possa salvar as alterações */}
        <Route path="/perfil" element={<PerfilPage onSave={handleUpdatePerfil} />} />
      </Routes>
    </Router>
  );
}

export default App; // exporta o componente App para ser usado no index.js, o ponto de entrada da aplicação