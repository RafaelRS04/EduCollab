import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Forum() {
  const [posts, setPosts] = useLocalStorage('forumPosts', []);
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPost = {
      id: 'topico-' + Date.now(),
      autor,
      titulo,
      conteudo,
      data: new Date().toLocaleDateString('pt-BR'),
      respostas: []
    };
    setPosts([novoPost, ...posts]);
    setAutor('');
    setTitulo('');
    setConteudo('');
  };

  return (
    <>
      <Navbar title="Fórum de Dúvidas" backTo="/" backText="Voltar para Home" />
      <div className="container mt-5">
        <div className="card p-4 shadow-sm mb-5">
          <h4 className="mb-3"><i className="bi bi-pencil-square me-2"></i> Crie um novo tópico</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="postAutor" className="form-label">Seu Nome</label>
              <input type="text" id="postAutor" className="form-control" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Ex: Prof. Silva" required />
            </div>
            <div className="mb-3">
              <label htmlFor="postTitulo" className="form-label">Título da Dúvida</label>
              <input type="text" id="postTitulo" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Seja claro e objetivo" required />
            </div>
            <div className="mb-3">
              <label htmlFor="postConteudo" className="form-label">Descreva sua dúvida</label>
              <textarea id="postConteudo" className="form-control" rows="4" value={conteudo} onChange={(e) => setConteudo(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-roxo w-100">
              <i className="bi bi-send-fill me-2"></i> Publicar Tópico
            </button>
          </form>
        </div>

        <h4 className="mb-3"><i className="bi bi-chat-left-text-fill me-2"></i> Tópicos Recentes</h4>
        <div className="list-group shadow-sm">
          {posts.length === 0 ? (
            <div className="list-group-item"><p className="text-muted text-center my-3">Nenhum tópico foi criado ainda. Seja o primeiro a postar!</p></div>
          ) : (
            posts.map(post => (
              <Link key={post.id} to={`/topico/${post.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{post.titulo}</h5>
                  <small>{post.data}</small>
                </div>
                <p className="mb-1">Postado por: <strong>{post.autor}</strong></p>
                <small>{post.respostas.length} respostas.</small>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Forum;
