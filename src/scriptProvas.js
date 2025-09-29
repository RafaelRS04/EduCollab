const questoes = []; // array de questoes que serao cadastradas 
const provasGeradas = {}; // ira contem o codigo da prova 

const listaQuestoes = document.getElementById("listaQuestoes"); // JS pode manipular a div criada no HTML
const provasContainer = document.getElementById("provasContainer");
const respostasAlunoDiv = document.getElementById("respostasAluno"); 


// cadastro de questoes
document.getElementById("questaoForm").addEventListener("submit", (e) => {  // "escuta" o comando submit e faz:
  e.preventDefault();  // JS controla todo o processo, para que não haja interrupcoes para o usuario 
  const enunciado = document.getElementById("enunciado").value; // recebe o que foi escrito no campo enunciado 
  const alternativas = Array.from(document.querySelectorAll(".alternativa")).map(a => a.value); // recebe todos os elementos da classe alternativa, transforma em um array manipulavel pelo JS 
  const resposta = document.getElementById("respostaCorreta").value; // recebe a resposta correta 

  questoes.push({ enunciado, alternativas, resposta }); // organiza os dados coletados e add em uma noca questão, ao final do array que contem todoas as questoes do sistema 

  const card = document.createElement("div"); // cria uma nova div no HTML 
  card.className = "card p-2";
  card.innerHTML = `<b>${enunciado}</b> (Correta: ${resposta})`; // define o conteudo dentro da div criada 
  listaQuestoes.appendChild(card); // a div é add como filho do 'listaQuestoes' - questão add aprece na tela 

  e.target.reset(); // limpa todos os campos para novo cadastro de questoes 
});

// gerar provas
document.getElementById("gerarProvasBtn").addEventListener("click", () => {
  // pega os valores dos dois inputs e converte para número
  const numProvas = parseInt(document.getElementById("numProvas").value, 10);  // quantidade de provas
  const numQuestoesPorProva = parseInt(document.getElementById("numQuestoesPorProva").value, 10); // quantidade de questões 

  // verifica se sao numero validos 
  if (isNaN(numProvas) || numProvas <= 0 || isNaN(numQuestoesPorProva) || numQuestoesPorProva <= 0) {
    alert("Por favor, insira valores válidos para a quantidade de provas e de questões.");
    return;
  }

  // verifica se existe questoes cadastradas 
  if (questoes.length === 0) {
    alert("É necessário cadastrar questões antes de gerar provas.");
    return;
  }

  // verifica se o numero de questoes eh suficiente 
  if (questoes.length < numQuestoesPorProva) {
    alert(`Você solicitou ${numQuestoesPorProva} questões por prova, mas só existem ${questoes.length} questões cadastradas. Por favor, cadastre mais questões ou reduza o número solicitado.`);
    return;
  }

  // cria o codigo da prova 
  for (let i = 1; i <= numProvas; i++) {
    const codigo = "PROVA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // sorteia as questoes para cada prova 
    const questoesSorteadas = [...questoes]
      .sort(() => 0.5 - Math.random())
      .slice(0, numQuestoesPorProva);
    
    provasGeradas[codigo] = questoesSorteadas;

    const card = document.createElement("div"); // cria uma div no HTML
    card.className = "card p-3 mb-3";
    card.innerHTML = `<h5>Prova ${i} - Código: ${codigo}</h5>
      ${questoesSorteadas.map((q, idx) => `
        <p><b>${idx + 1})</b> ${q.enunciado}<br>
          A) ${q.alternativas[0]}<br>
          B) ${q.alternativas[1]}<br>
          C) ${q.alternativas[2]}<br>
          D) ${q.alternativas[3]}</p>
      `).join("")}
      <button class="btn btn-primary baixarPdf mt-2">Baixar PDF</button>`;
    
    provasContainer.appendChild(card); // div fica visivel pro usuario 

    // baixar pdf das provas geradas 
    card.querySelector(".baixarPdf").addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // titulo e codigo da prova 
      doc.setFontSize(14);
      doc.text(`Prova - Código: ${codigo}`, 10, 10);

      // add nome do professor 

      // adiciona o campo para o nome do aluno
      doc.setFontSize(12); 
      doc.text("Nome:", 10, 25);
      doc.line(25, 25, 150, 25); 

      // add data 
      doc.setFontSize(12); 
      doc.text("Data: ___/___/___", 10, 30);


      let y = 45;
      // add a prova as questoes sorteadas e as alternativas 
      questoesSorteadas.forEach((q, idx) => {
        const enunciadoLines = doc.splitTextToSize(`${idx + 1}) ${q.enunciado}`, 180);
        doc.text(enunciadoLines, 10, y);
        y += (enunciadoLines.length * 6);

        q.alternativas.forEach((alt, j) => {
          const alternativaLines = doc.splitTextToSize(`${String.fromCharCode(65 + j)}) ${alt}`, 170);
          doc.text(alternativaLines, 15, y);
          y += (alternativaLines.length * 6);
        });
        y += 5;
      });
      doc.save(`${codigo}.pdf`); // salva a prova em pdf com o codigo 
    });
  }
});

// Corrigir prova
document.getElementById("correcaoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const codigo = document.getElementById("codigoProva").value; // salva o codigo da prova digitado
  const prova = provasGeradas[codigo]; // busca codigo digitado no arrey de provas geradas 
  if (!prova) {
    alert("Código inválido!");
    return;
  }

  const respostasAluno = Array.from(document.querySelectorAll(".respAluno")).map(r => r.value); // cria uma array para a resposta do aluno
  let acertos = 0; // contaor de acertos 
  prova.forEach((q, i) => { // q = questão ; i = indice 
    if (respostasAluno[i] === q.resposta) acertos++; // compara a resposta do aluno na posição i com a resposta correta da questao (q.resposta)
  });

  const nota = (acertos / prova.length * 10).toFixed(1); // calcula a not da prova cm uma casa decimal (toFixed(1))
  document.getElementById("nota").textContent = nota; // add o valor da nota no elemento "id= nota "
});

// mostra opções de resposta para o codigo da prova digitado 
document.getElementById("codigoProva").addEventListener("input", (e) => {
  const codigo = e.target.value; // le o valor atula do codigo digitado a partir do evento 
  const prova = provasGeradas[codigo]; // b usca a prova correspondente ao codigo 
  respostasAlunoDiv.innerHTML = "";
  if (prova) { // se exixtir a prova 
    prova.forEach((q, i) => {
      const div = document.createElement("div"); // cria uma div no html 
      div.className = "mb-2";
      div.innerHTML = `
        <label>Questão ${i + 1}</label>
        <select class="form-select respAluno" required>
          <option value="">Selecione</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>`;
      respostasAlunoDiv.appendChild(div); // add a diva na pagina 
    });
  }
});
