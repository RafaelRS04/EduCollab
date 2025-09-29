
function salvarPerfil(dados) {
  sessionStorage.setItem("perfilProfessor", JSON.stringify(dados));
}

function obterPerfil() {
  const dados = sessionStorage.getItem("perfilProfessor");
  return dados ? JSON.parse(dados) : null;
}


function carregarPerfil() {
  const perfil = obterPerfil();
  if (perfil) {
    const nomeEl = document.getElementById("nomePerfil");
    const fotoEl = document.getElementById("fotoPerfil");

    if (nomeEl && perfil.nome) nomeEl.textContent = perfil.nome;
    if (fotoEl && perfil.foto) fotoEl.src = perfil.foto;
  }
}

function carregarPerfilFormulario() {
  const perfil = obterPerfil();

  if (perfil) {
    document.getElementById("nome").value = perfil.nome?.replace(/^Prof\. /, "") || "";
    document.getElementById("telefone").value = perfil.telefone || "";
    document.getElementById("email").value = perfil.email || "";
    document.getElementById("area").value = perfil.area || "";
    document.getElementById("materias").value = perfil.materias || "";
    if (perfil.foto) {
      document.getElementById("fotoPreview").src = perfil.foto;
    }
  }

  // Ver foto escolhida
  const fotoInput = document.getElementById("foto");
  if (fotoInput) {
    fotoInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("fotoPreview").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Salvar perfil
  const form = document.getElementById("perfilForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nomeDigitado = document.getElementById("nome").value.trim();
      const perfil = {
        nome: nomeDigitado ? `Prof. ${nomeDigitado}` : "Professor",
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        area: document.getElementById("area").value,
        materias: document.getElementById("materias").value,
        foto: document.getElementById("fotoPreview").src,
      };

      salvarPerfil(perfil);
      alert("Perfil atualizado com sucesso!");
      window.location.href = "home_professor.html";
    });
  }
}
