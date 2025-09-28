import React, { useState } from 'react';


// Componnete da página do fórum 
function ForumPage() {

  // -- ESTADOS DO COMPONENTE --
  //  'usestate' criam variáveis de memória para o componente 
  const [posts, setPosts] = useState([]); 
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [commentText, setCommentText] = useState({});

  // -- FUNÇÕES DE LÓGICA --

   //  cria um novo objeto de post e o adiciona ao array 'posts'
  const handlePublicar = (event) => {
    event.preventDefault(); // impede o recarregamento da página.
    const novoPost = { id: Date.now(), titulo, conteudo, comments: [] };
    setPosts([novoPost, ...posts]); // ads no início da lista
    setTitulo(''); setConteudo(''); // limpa os campos do formulári
  };

  // remove um post da lista com base no seu ID
  const handleExcluir = (idParaExcluir) => {
    setPosts(posts.filter(post => post.id !== idParaExcluir));
  };

  //atualiza o texto do comentário para um post específico
  const handleCommentChange = (postId, text) => {
    setCommentText(prev => ({ ...prev, [postId]: text }));
  };

  // encontra o post correto, cria um novo comentário e o adiciona à lista de comentários daquele post.
  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();
    const text = commentText[postId] || '';
    if (!text.trim()) return; // ignora comentário vazios
    const newComment = { id: Date.now(), text: text };
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });
    setPosts(updatedPosts);
    handleCommentChange(postId, ''); // limpa o campo de comentário 
  };

  //-- ESTRUTURA VISUAL --

  return (
    <main className="page-container">
      {/* cabeçalho da página */}
      <div className="page-header">
        <div className="page-header-icon" style={{color: 'var(--green-base)'}}><i className="bi bi-chat-dots-fill"></i></div>
        <div className="page-header-title">
          <h2>Fórum de Professores</h2>
          <p>Compartilhe experiências e tire dúvidas com colegas</p>
        </div>
      </div>

      {/* card com o formulário para criar uma nova postagem */}
      <div className="card">
        <h5><i className="bi bi-plus-circle me-2"></i> Nova Postagem</h5>
        <form id="postForm" onSubmit={handlePublicar} className="mt-3">
          <div className="mb-3"><label htmlFor="titulo" className="form-label">Título</label><input type="text" id="titulo" className="form-control" placeholder="Digite o título da sua dúvida ou experiência" required value={titulo} onChange={(e) => setTitulo(e.target.value)} /></div>
          <div className="mb-3"><label htmlFor="conteudo" className="form-label">Conteúdo</label><textarea id="conteudo" className="form-control" rows="4" placeholder="Escreva sua dúvida ou experiência em detalhes" required value={conteudo} onChange={(e) => setConteudo(e.target.value)}></textarea></div>
          <button type="submit" className="btn btn-primary w-100"><i className="bi bi-plus-lg me-2"></i> Publicar</button>
        </form>
      </div>

      <h5 className="mt-4 mb-3">Postagens Recentes</h5>
       {/* se o array 'posts' estiver vazio, mostra uma mensagem de "Nenhuma postagem ainda". */}
      posts.length === 0 ? (
      {posts.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <i className="bi bi-chat-square-dots"></i>
            <h5>Nenhuma postagem ainda</h5>
            <p>Seja o primeiro a compartilhar uma experiência ou fazer uma pergunta!</p>
          </div>
        </div>
      ) : (
        posts.map(post => (
          // se houver posts, usa '.map()' para criar um card para cada post na lista
          <div key={post.id} className="card">
             {/* exibe o título, conteúdo e botão de excluir do post */}
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title">{post.titulo}</h5>
                <p className="card-text">{post.conteudo}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(post.id)}><i className="bi bi-trash"></i></button>
            </div>
            <hr />
            <div className="mt-2">
              {/* usa um '.map()' aninhado para exibir cada comentário do post. */}
              <h6>Respostas ({post.comments.length})</h6>
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">{comment.text}</div>
              ))}
              {/* formulário para adicionar um novo comentário, ligado às suas próprias funções. */}
              <form className="commentForm mt-3" onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                <input type="text" className="form-control" placeholder="Escreva uma resposta..." required value={commentText[post.id] || ''} onChange={(e) => handleCommentChange(post.id, e.target.value)} />
                <button type="submit" className="btn btn-success">Responder</button>
              </form>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default ForumPage; // exporta o componente para ser usado em outras partes da aplicação.