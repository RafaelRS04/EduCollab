import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TopicoDetalhe = () => {
    const { id } = useParams(); // Pega o 'id' do tópico da URL
    const navigate = useNavigate();
    const [topico, setTopico] = useState(null);
    const [posts, setPosts] = useState([]);

    // Carrega todos os posts e encontra o tópico específico
    useEffect(() => {
        const postsSalvos = JSON.parse(localStorage.getItem('forumPosts')) || [];
        setPosts(postsSalvos);
        const topicoEncontrado = postsSalvos.find(p => p.id === id);
        setTopico(topicoEncontrado);
    }, [id]);

    const adicionarResposta = (e) => {
        e.preventDefault();
        const form = e.target;
        const novaResposta = {
            autor: form.respostaAutor.value,
            texto: form.respostaTexto.value,
        };

        const postsAtualizados = posts.map(p => {
            if (p.id === id) {
                return { ...p, respostas: [...p.respostas, novaResposta] };
            }
            return p;
        });

        setPosts(postsAtualizados);
        localStorage.setItem('forumPosts', JSON.stringify(postsAtualizados));
        setTopico(postsAtualizados.find(p => p.id === id)); // Atualiza o tópico na tela
        form.reset();
    };

    if (!topico) {
        return <div className="container mt-5">Tópico não encontrado ou carregando...</div>;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand text-white" to="/professor/forum">← Voltar para o Fórum</Link>
                    <span className="navbar-text text-white fw-bold">Detalhes do Tópico</span>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="card shadow-sm mb-4">
                    <div className="card-header d-flex justify-content-between">
                        <h4 className="mb-0">{topico.titulo}</h4>
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
                    {topico.respostas.length > 0 ? (
                        topico.respostas.map((resposta, index) => (
                            <div className="card card-body bg-light mb-2" key={index}>
                                <p>{resposta.texto}</p>
                                <small className="text-muted">Respondido por: <strong>{resposta.autor}</strong></small>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">Nenhuma resposta ainda. Seja o primeiro a responder!</p>
                    )}
                </div>

                <div className="card p-4 shadow-sm">
                    <h5 className="mb-3">Deixe sua resposta</h5>
                    <form onSubmit={adicionarResposta}>
                        <div className="mb-3">
                            <label htmlFor="respostaAutor" className="form-label">Seu Nome</label>
                            <input type="text" className="form-control" id="respostaAutor" placeholder="Digite seu nome" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="respostaTexto" className="form-label">Sua Resposta</label>
                            <textarea className="form-control" id="respostaTexto" rows="3" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">
                            <i className="bi bi-reply-fill me-2"></i> Enviar Resposta
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TopicoDetalhe;