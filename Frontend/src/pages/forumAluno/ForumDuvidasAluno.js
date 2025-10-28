import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { getForumTopics, createForumTopic } from '../../apiService.js';

const ForumDuvidas = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        postTitulo: '',
        postConteudo: ''
    });
    
    const token = localStorage.getItem('token')

    // Carrega os posts da API quando a página abre
    const fetchPosts = () => {
        if (!token) return; // Não faz nada se não tiver token
        
        setIsLoading(true);
        getForumTopics(token)
            .then(data => {
                // O backend retorna 'autor_nome', 'data', etc.
                // O map garante que os nomes das props batem com o esperado
                const postsFormatados = data.map(post => ({
                    ...post,
                    autor: post.autor_nome, // Ajusta o nome da prop
                    data: new Date(post.data).toLocaleDateString('pt-BR') // Formata a data
                }));
                setPosts(postsFormatados);
                setError(null);
            })
            .catch(err => {
                console.error("Erro ao buscar tópicos:", err);
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, [token]); // Recarrega se o token mudar

    // Atualiza o estado do formulário de novo post
    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [id]: value }));
    };

    // Adiciona um novo post via API
    const handleAddPost = (e) => {
        e.preventDefault();
        if (!token) {
            setError("Você precisa estar logado para postar.");
            return;
        }

        const topicData = {
            titulo: newPost.postTitulo,
            conteudo: newPost.postConteudo
        };

        createForumTopic(token, topicData)
            .then(novoTopicoDoServidor => {
                // Adiciona o novo post à lista (ou recarrega a lista)
                fetchPosts(); // Simplesmente recarrega a lista
                
                // Limpa o formulário
                setNewPost({ postTitulo: '', postConteudo: '' });
            })
            .catch(err => {
                console.error("Erro ao criar tópico:", err);
                setError(err.message);
            });
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
                                <label htmlFor="postTitulo" className="form-label">Título da Dúvida</label>
                                <input type="text" id="postTitulo" className="form-control" placeholder="Seja claro e objetivo" required value={newPost.postTitulo} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postConteudo" className="form-label">Descreva sua dúvida</label>
                                <textarea id="postConteudo" className="form-control" rows="4" required value={newPost.postConteudo} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-prim w-100">
                                <i className="bi bi-send-fill me-2"></i> Publicar Tópico
                            </button>
                        </form>
                    </div>

                    <h4 className="mb-3"><i className="bi bi-chat-left-text-fill me-2"></i> Tópicos Recentes</h4>
                    <div className="list-group shadow-sm">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <Link key={post.id} to={`/aluno/forumAluno/topico/${post.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
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