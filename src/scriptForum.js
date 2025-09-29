const form = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;

  // Criar card da postagem
  const postCard = document.createElement('div');
  postCard.className = 'card p-3';
  postCard.innerHTML = `
    <h5 class="card-title">${titulo}</h5>
    <p class="card-text">${conteudo}</p>
    <button class="btn btn-danger btn-sm mt-2">Excluir</button>

    <!-- Área de comentários -->
    <div class="mt-3">
      <h6>Respostas</h6>
      <div class="comments"></div>
      <form class="commentForm mt-2">
        <input type="text" class="form-control mb-2" placeholder="Digite sua resposta" required>
        <button type="submit" class="btn btn-success btn-sm">Responder</button>
      </form>
    </div>
  `;

  // Excluir postagem
  postCard.querySelector('.btn-danger').addEventListener('click', () => {
    postCard.remove();
  });

  // Comentarios
  const commentForm = postCard.querySelector('.commentForm');
  const commentsDiv = postCard.querySelector('.comments');

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = commentForm.querySelector('input');
    const commentText = input.value;

    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.textContent = commentText;

    commentsDiv.appendChild(commentEl);
    input.value = '';
  });

  postsContainer.prepend(postCard); // adiciona no topo
  form.reset(); // limpa formulario
});
