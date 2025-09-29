document.addEventListener('DOMContentLoaded', () => {

    // Roteador: Decide qual função executar com base na página atual
    if (document.getElementById('forumContainer')) {
        inicializarPaginaForum();
    } else if (document.getElementById('topicoContainer')) {
        inicializarPaginaTopico();
    }

});

// LÓGICA PARA A PÁGINA PRINCIPAL DO FÓRUM
function inicializarPaginaForum() {
    const postForm = document.getElementById('postForm');
    carregarListaTopicos();

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const novoPost = {
            id: 'topico-' + Date.now(), // ID único baseado no tempo
            autor: document.getElementById('postAutor').value,
            titulo: document.getElementById('postTitulo').value,
            conteudo: document.getElementById('postConteudo').value,
            data: new Date().toLocaleDateString('pt-BR'),
            respostas: []
        };

        const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        posts.unshift(novoPost); // Adiciona no início
        localStorage.setItem('forumPosts', JSON.stringify(posts));

        postForm.reset();
        carregarListaTopicos();
    });
}

function carregarListaTopicos() {
    const forumContainer = document.getElementById('forumContainer');
    forumContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];

    if (posts.length === 0) {
        forumContainer.innerHTML = '<div class="list-group-item"><p class="text-muted text-center my-3">Nenhum tópico foi criado ainda. Seja o primeiro a postar!</p></div>';
        return;
    }

    posts.forEach(post => {
        const topicoElement = document.createElement('a');
        topicoElement.href = `topico_detalhe.html?id=${post.id}`;
        topicoElement.className = 'list-group-item list-group-item-action flex-column align-items-start';
        topicoElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${post.titulo}</h5>
                <small>${post.data}</small>
            </div>
            <p class="mb-1">Postado por: <strong>${post.autor}</strong></p>
            <small>${post.respostas.length} respostas.</small>
        `;
        forumContainer.appendChild(topicoElement);
    });
}

// LÓGICA PARA A PÁGINA DE DETALHES DO TÓPICO
function inicializarPaginaTopico() {
    const urlParams = new URLSearchParams(window.location.search);
    const topicoId = urlParams.get('id');

    if (!topicoId) {
        window.location.href = 'forum_duvidas.html'; // Redireciona se não houver ID
        return;
    }

    renderizarTopico(topicoId);

    const respostaForm = document.getElementById('respostaForm');
    respostaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        adicionarResposta(topicoId);
    });
}

function renderizarTopico(topicoId) {
    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    const topico = posts.find(p => p.id === topicoId);

    if (!topico) {
        document.getElementById('topicoContainer').innerHTML = '<div class="card-body text-center"><p class="text-danger">Tópico não encontrado!</p></div>';
        return;
    }

    // Renderiza o post principal
    const topicoContainer = document.getElementById('topicoContainer');
    topicoContainer.innerHTML = `
        <div class="card-header d-flex justify-content-between">
            <h4 class="mb-0">${topico.titulo}</h4>
            <button class="btn btn-sm btn-outline-danger" onclick="removerTopico('${topico.id}')">
                <i class="bi bi-trash"></i> Excluir Tópico
            </button>
        </div>
        <div class="card-body">
            <blockquote class="blockquote">
                <p>${topico.conteudo}</p>
            </blockquote>
        </div>
        <div class="card-footer text-muted">
            Postado por <strong>${topico.autor}</strong> em ${topico.data}
        </div>
    `;

    // Renderiza as respostas
    const respostasContainer = document.getElementById('respostasContainer');
    respostasContainer.innerHTML = '';
    if (topico.respostas.length === 0) {
        respostasContainer.innerHTML = '<p class="text-muted">Nenhuma resposta ainda. Seja o primeiro a responder!</p>';
    } else {
        topico.respostas.forEach(resposta => {
            const respostaElement = document.createElement('div');
            respostaElement.className = 'card card-body bg-light mb-2';
            respostaElement.innerHTML = `
                <p>${resposta.texto}</p>
                <small class="text-muted">Respondido por: <strong>${resposta.autor}</strong></small>
            `;
            respostasContainer.appendChild(respostaElement);
        });
    }
}

function adicionarResposta(topicoId) {
    const autor = document.getElementById('respostaAutor').value;
    const texto = document.getElementById('respostaTexto').value;

    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
    const postIndex = posts.findIndex(p => p.id === topicoId);

    if (postIndex > -1) {
        posts[postIndex].respostas.push({ autor, texto });
        localStorage.setItem('forumPosts', JSON.stringify(posts));
        document.getElementById('respostaForm').reset();
        renderizarTopico(topicoId); // Re-renderiza tudo para mostrar a nova resposta
    }
}

// FUNÇÕES GLOBAIS (acessíveis via onclick)
function removerTopico(topicoId) {
    if (confirm('Tem certeza que deseja remover este tópico e todas as suas respostas?')) {
        let posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        posts = posts.filter(p => p.id !== topicoId);
        localStorage.setItem('forumPosts', JSON.stringify(posts));
        alert('Tópico removido com sucesso!');
        window.location.href = 'forum_duvidas.html'; // Volta para a lista
    }
}
