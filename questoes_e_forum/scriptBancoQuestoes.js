document.addEventListener('DOMContentLoaded', () => {
    const questaoForm = document.getElementById('questaoForm');
    const listaQuestoesContainer = document.getElementById('listaQuestoes');

    // Carrega as questões salvas no Local Storage ao iniciar
    const carregarQuestoesProfessor = () => {
        if (!listaQuestoesContainer) return;

        listaQuestoesContainer.innerHTML = '';
        const questoes = JSON.parse(localStorage.getItem('bancoQuestoes')) || [];

        if (questoes.length === 0) {
            listaQuestoesContainer.innerHTML = '<p class="text-muted col-12">Nenhuma questão cadastrada ainda.</p>';
            return;
        }

        questoes.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'col-md-6';
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-subtitle mb-2 text-muted">Matéria: ${q.materia}</h6>
                        <p class="card-text fw-bold">${q.enunciado}</p>
                        <ul class="list-unstyled">
                            ${q.alternativas.map((alt, i) => `<li><strong>${String.fromCharCode(65 + i)}:</strong> ${alt}</li>`).join('')}
                        </ul>
                        <p class="text-success mt-auto">Resposta Correta: ${q.resposta}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 text-end">
                         <button class="btn btn-sm btn-danger" onclick="removerQuestao(${index})">
                            <i class="bi bi-trash-fill me-1"></i> Excluir
                         </button>
                    </div>
                </div>
            `;
            listaQuestoesContainer.appendChild(card);
        });
    };

    // Salva uma nova questão
    if (questaoForm) {
        questaoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const alternativasInputs = document.querySelectorAll('input[name="alternativa"]');
            const alternativas = Array.from(alternativasInputs).map(input => input.value);

            const novaQuestao = {
                materia: document.getElementById('materia').value,
                enunciado: document.getElementById('enunciado').value,
                alternativas: alternativas,
                resposta: document.getElementById('respostaCorreta').value,
            };

            const questoes = JSON.parse(localStorage.getItem('bancoQuestoes')) || [];
            questoes.push(novaQuestao);
            localStorage.setItem('bancoQuestoes', JSON.stringify(questoes));

            alert('Questão salva com sucesso!');
            questaoForm.reset();
            carregarQuestoesProfessor();
        });
    }

    // Função global para remover questão (acessível pelo onclick)
    window.removerQuestao = (index) => {
        if (confirm('Tem certeza que deseja excluir esta questão?')) {
            const questoes = JSON.parse(localStorage.getItem('bancoQuestoes')) || [];
            questoes.splice(index, 1);
            localStorage.setItem('bancoQuestoes', JSON.stringify(questoes));
            carregarQuestoesProfessor();
        }
    };

    // Chama o carregamento inicial para a página do professor
    carregarQuestoesProfessor();
});

// -------------------------- FUNÇÕES PARA A PÁGINA DO ALUNO --------------------------

const carregarQuestoesAluno = () => {
    const container = document.getElementById('questoesAlunoContainer');
    const filtroMateria = document.getElementById('filtroMateria');
    if (!container) return;

    const questoes = JSON.parse(localStorage.getItem('bancoQuestoes')) || [];
    
    const renderizarQuestoes = (questoesFiltradas) => {
        container.innerHTML = '';
        if (questoesFiltradas.length === 0) {
            container.innerHTML = '<p class="text-muted col-12">Nenhuma questão encontrada.</p>';
            return;
        }

        questoesFiltradas.forEach((q, index) => {
            const questaoId = `q-${index}`;
            const card = document.createElement('div');
            card.className = 'col-md-6';
            card.innerHTML = `
                <div class="card shadow-sm h-100">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${q.materia}</span>
                        <p class="card-text fw-bold">${index + 1}. ${q.enunciado}</p>
                        <div id="${questaoId}">
                            ${q.alternativas.map((alt, i) => `
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="${questaoId}-resp" id="${questaoId}-${i}" value="${String.fromCharCode(65 + i)}">
                                    <label class="form-check-label" for="${questaoId}-${i}">
                                        ${String.fromCharCode(65 + i)}) ${alt}
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn btn-sm btn-success mt-3" onclick="verificarResposta('${questaoId}', '${q.resposta}')">
                            <i class="bi bi-check2-circle"></i> Verificar
                        </button>
                        <div id="feedback-${questaoId}" class="mt-2"></div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    };

    // Renderização inicial
    renderizarQuestoes(questoes);

    // Lógica do filtro
    if (filtroMateria) {
        filtroMateria.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            const questoesFiltradas = questoes.filter(q => q.materia.toLowerCase().includes(termo));
            renderizarQuestoes(questoesFiltradas);
        });
    }
};


// Função global para verificar a resposta do aluno
window.verificarResposta = (questaoId, respostaCorreta) => {
    const respostaSelecionada = document.querySelector(`input[name="${questaoId}-resp"]:checked`);
    const feedbackDiv = document.getElementById(`feedback-${questaoId}`);

    if (!respostaSelecionada) {
        feedbackDiv.innerHTML = '<div class="alert alert-warning p-2">Selecione uma alternativa!</div>';
        return;
    }

    if (respostaSelecionada.value === respostaCorreta) {
        feedbackDiv.innerHTML = '<div class="alert alert-success p-2"><strong>Parabéns!</strong> Resposta Correta!</div>';
    } else {
        feedbackDiv.innerHTML = `<div class="alert alert-danger p-2"><strong>Ops!</strong> Resposta Incorreta. A resposta certa é a <strong>${respostaCorreta}</strong>.</div>`;
    }
};
