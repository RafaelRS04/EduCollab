import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// define o componente da Página de Perfil
function PerfilPage({ onSave }) { // recebe a função 'onSave' via props, que veio do App.js
  
   // -- ESTADOS E HOOKS DO COMPONENTE --
  const navigate = useNavigate(); // Hook que permite redirecionar o usuário para outras páginas
  const [perfil, setPerfil] = useState({
    nome: '', telefone: '', email: '', area: '', materias: '', foto: 'https://via.placeholder.com/100'
  }); // 0bjeto de estado que armazena todas as informações do formulário

   // -- FUNÇÕES DE LÓGICA --

   // busca os dados do perfil que já estão salvos no navegador
  useEffect(() => {
    const dadosSalvos = sessionStorage.getItem("perfilProfessor");
    if (dadosSalvos) {
      setPerfil(JSON.parse(dadosSalvos));
    }
  }, []); //  'useEffect' executa uma vez (devido ao `[]`) quando a página carrega.

  // função genérica que atualiza o estado 'perfil' 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil(p => ({ ...p, [id]: value }));
  };

 // função específica para o campo de upload de foto. 
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPerfil(p => ({ ...p, foto: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  //  chamada ao clicar no botão "salvar alterações"
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(perfil);
    alert("Perfil atualizado com sucesso!");
    navigate("/");
  };

  //-- ESTRUTURA VISUAL --

  return (
    <main className="page-container">
       {/* cabeçalho da página */}
      <div className="page-header">
        <div className="page-header-icon"><i className="bi bi-person-fill"></i></div>
        <div className="page-header-title">
          <h2>Editar Perfil</h2>
          <p>Mantenha suas informações sempre atualizadas</p>
        </div>
      </div>
      
      {/* card principal que contém o formulário */}
      <div className="card">
        {/* formulário ligado à função 'handleSubmit' para ser executada no envio */}
        <form id="perfilForm" onSubmit={handleSubmit}>

          {/* seção para visualização e upload da foto de perfil */}
          <div className="text-center mb-4">
            <img id="fotoPreview" src={perfil.foto} className="rounded-circle mb-3" style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt="Preview" />
            <input type="file" id="foto" className="form-control" accept="image/*" onChange={handleFotoChange} />
          </div>

           {/* campos do formulário (nome, telefone, etc.). Cada um é um "componente controlado", 
              ligado ao estado 'perfil' e à função 'handleChange' */}
          <div className="row g-3">
            <div className="col-md-6 mb-3"><label htmlFor="nome" className="form-label">Nome Completo</label><input type="text" id="nome" className="form-control" placeholder="Seu nome completo" required value={perfil.nome} onChange={handleChange} /></div>
            <div className="col-md-6 mb-3"><label htmlFor="telefone" className="form-label">Telefone</label><input type="tel" id="telefone" className="form-control" placeholder="(99) 99999-9999" value={perfil.telefone} onChange={handleChange} /></div>
            <div className="col-md-12 mb-3"><label htmlFor="email" className="form-label">E-mail</label><input type="email" id="email" className="form-control" placeholder="seuemail@exemplo.com" required value={perfil.email} onChange={handleChange} /></div>
            <div className="col-md-6 mb-3"><label htmlFor="area" className="form-label">Área de Ensino</label><select id="area" className="form-select" required value={perfil.area} onChange={handleChange}><option value="">Selecione...</option><option value="Ensino Médio">Ensino Médio</option><option value="Graduação">Graduação</option></select></div>
            <div className="col-md-6 mb-3"><label htmlFor="materias" className="form-label">Matérias que Leciona</label><input type="text" id="materias" className="form-control" placeholder="Ex: Matemática, Física" value={perfil.materias} onChange={handleChange} /></div>
          </div>

           {/* botão para salvar o formulário */}
          <button type="submit" className="btn btn-primary mt-3 w-100">Salvar Alterações</button>
        </form>
      </div>
    </main>
  );
}

export default PerfilPage; // exporta o componente para ser usado em outras partes da aplicação.