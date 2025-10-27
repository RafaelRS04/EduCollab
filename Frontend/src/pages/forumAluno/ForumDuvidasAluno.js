import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const ForumDuvidas = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        postAutor: '',
        postTitulo: '',
        postConteudo: ''
    });

    // Carrega os posts do localStorage quando a página abre
    useEffect(() => {
        const postsSalvos = localStorage.getItem('forumPosts');
        if (postsSalvos) {
            setPosts(JSON.parse(postsSalvos));
        }
    }, []);

    // Atualiza o estado do formulário de novo post
    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [id]: value }));
    };

    // Adiciona um novo post à lista
    const handleAddPost = (e) => {
        e.preventDefault();
        const novoPost = {
            id: 'topico-' + Date.now(),
            autor: newPost.postAutor,
            titulo: newPost.postTitulo,
            conteudo: newPost.postConteudo,
            data: new Date().toLocaleDateString('pt-BR'),
            respostas: []
        };
        
        const postsAtualizados = [novoPost, ...posts];
        setPosts(postsAtualizados);
        localStorage.setItem('forumPosts', JSON.stringify(postsAtualizados));
        
        // Limpa o formulário
        setNewPost({ postAutor: '', postTitulo: '', postConteudo: '' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: '1 0 auto', paddingBottom: '80px' }}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link className="navbar-brand text-white" to="/aluno/home">← Voltar</Link>
                        <span className="navbar-text text-white fw-bold">Fórum de Dúvidas</span>
                    </div>
                </nav>

                <div className="container mt-5">
                    <div className="card p-4 shadow-sm mb-5">
                        <h4 className="mb-3"><i className="bi bi-pencil-square me-2"></i> Crie um novo tópico</h4>
                        <form id="postForm" onSubmit={handleAddPost}>
                            <div className="mb-3">
                                <label htmlFor="postAutor" className="form-label">Seu Nome</label>
                                <input type="text" id="postAutor" className="form-control" placeholder="Ex: Luciano Rocha" required value={newPost.postAutor} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postTitulo" className="form-label">Título da Dúvida</label>
                                <input type="text" id="postTitulo" className="form-control" placeholder="Seja claro e objetivo" required value={newPost.postTitulo} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postConteudo" className="form-label">Descreva sua dúvida</label>
                                <textarea id="postConteudo" className="form-control" rows="4" required value={newPost.postConteudo} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                <i className="bi bi-send-fill me-2"></i> Publicar Tópico
                            </button>
                        </form>
                    </div>

                    <h4 className="mb-3"><i className="bi bi-chat-left-text-fill me-2"></i> Tópicos Recentes</h4>
                    <div className="list-group shadow-sm">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <Link key={post.id} to={`/forum/topico/${post.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{post.titulo}</h5>
                                        <small>{post.data}</small>
                                    </div>
                                    <p className="mb-1">Postado por: <strong>{post.autor}</strong></p>
                                    <small>{post.respostas.length} respostas.</small>
                                </Link>
                            ))
                        ) : (
                            <div className="list-group-item">
                                <p className="text-muted text-center my-3">Nenhum tópico foi criado ainda. Seja o primeiro a postar!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForumDuvidas;