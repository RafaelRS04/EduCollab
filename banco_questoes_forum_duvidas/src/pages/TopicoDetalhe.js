import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from '../components/Navbar';

function TopicoDetalhe() {
  const { topicoId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useLocalStorage('forumPosts', []);
  
  const [respostaAutor, setRespostaAutor] = useState('');
  const [respostaTexto, setRespostaTexto] = useState('');

  const topico = posts.find(p => p.id === topicoId);

  const handleAddResposta = (e) => {
    e.preventDefault();
    const novaResposta = { autor: respostaAutor, texto: respostaTexto };
    
    const postsAtualizados = posts.map(p => {
      if (p.id === topicoId) {
        return { ...p, respostas: [...p.respostas, novaResposta] };
      }
      return p;
    });

    setPosts(postsAtualizados);
    setRespostaAutor('');
    setRespostaTexto('');
  };

  const removerTopico = () => {
    if (window.confirm('Tem certeza que deseja remover este tópico e todas as suas respostas?')) {
      setPosts(posts.filter(p => p.id !== topicoId));
      navigate('/forum');
    }
  };

  if (!topico) {
    return (
      <>
        <Navbar title="Erro" backTo="/forum" backText="Voltar para o Fórum" />
        <div className="container mt-5">
            <div className="alert alert-danger">Tópico não encontrado!</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar title="Detalhes do Tópico" backTo="/forum" backText="Voltar para o Fórum" />
      <div className="container mt-5">
        <div className="card shadow-sm mb-4">
          <div className="card-header d-flex justify-content-between">
            <h4 className="mb-0">{topico.titulo}</h4>
            <button className="btn btn-sm btn-outline-danger" onClick={removerTopico}>
              <i className="bi bi-trash"></i> Excluir Tópico
            </button>
          </div>
          <div className="card-body">
            <blockquote className="blockquote">
              <p>{topico.conteudo}</p>
            </blockquote>
          </div>
          <div className="card-footer text-muted">
            Postado por <strong>{topico.autor}</strong> em {topico.data}
          </div>
        </div>

        <h5 className="mb-3"><i className="bi bi-chat-dots-fill me-2"></i> Respostas</h5>
        <div className="mb-4">
          {topico.respostas.length === 0 ? (
            <p className="text-muted">Nenhuma resposta ainda. Seja o primeiro a responder!</p>
          ) : (
            topico.respostas.map((resposta, index) => (
              <div key={index} className="card card-body bg-light mb-2">
                <p>{resposta.texto}</p>
                <small className="text-muted">Respondido por: <strong>{resposta.autor}</strong></small>
              </div>
            ))
          )}
        </div>

        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Deixe sua resposta</h5>
          <form onSubmit={handleAddResposta}>
            <div className="mb-3">
              <label htmlFor="respostaAutor" className="form-label">Seu Nome</label>
              <input type="text" className="form-control" id="respostaAutor" value={respostaAutor} onChange={(e) => setRespostaAutor(e.target.value)} placeholder="Digite seu nome" required />
            </div>
            <div className="mb-3">
              <label htmlFor="respostaTexto" className="form-label">Sua Resposta</label>
              <textarea className="form-control" id="respostaTexto" rows="3" value={respostaTexto} onChange={(e) => setRespostaTexto(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-roxo">
              <i className="bi bi-reply-fill me-2"></i> Enviar Resposta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TopicoDetalhe;
