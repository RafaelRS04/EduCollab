# 📚 EduCollab - Página do Professor  

Este repositório contém a versão da **página do professor** da aplicação web **EduCollab**, desenvolvida utilizando **Bootstrap, HTML e CSS**.  

A página foi projetada para oferecer ao professor acesso às principais funcionalidades do sistema:  
- 📝 **Gerar Prova**: criação de avaliações de forma simples e organizada.  
- 💬 **Fórum de Professores**: espaço de comunicação e troca de experiências entre docentes.  
- 📂 **Banco de Questões**: armazenamento e consulta de questões para compor provas.  

---

## 🚀 Tecnologias Utilizadas  
- [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)  
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)  
- [Bootstrap 5](https://getbootstrap.com/)  

---

## 📂 Estrutura do Projeto  
```bash
pagina_professor/
├── home_professor.html         # Página principal
├── forum_professores.html         # Página de fórum entre professores
├── perfil_professor.html         # Página do perfil do professor
├── provas.html         # Página referente a provas: criar questão, crier prova e corrigir prova
├── scriptForum.js       # Script da página de fórum
├── scriptPerfil.js       # Script da página de perfil
├── scriptProvas.js       # Script da página de provas
├── style.css       # Style global de todas as páginas
```
---
## ▶️ Como Visualizar

Clone este repositório:

```bash
git clone https://github.com/RafaelRS04/EduCollab.git
```
Acesse a pasta do projeto:
```bash
cd EduCollab/pagina_professor
```
Abra o arquivo **home_professor.html** no seu navegador.


---
## 📌 Observações

Esta é a versão estática da página do professor (HTML, CSS e Bootstrap).

Futuras versões podem incluir integração com backend e funcionalidades dinâmicas.

---------------------------------------------------------------------------------
## 🌎 EduCollab - Página Principal (Landing Page)
Esta parte do repositório contém a página principal (Landing Page) da aplicação, que serve como porta de entrada para a plataforma. Foi desenvolvida com HTML, CSS e JavaScript puro.

A página foi projetada para apresentar o EduCollab a novos usuários e permitir o acesso ou registro na plataforma.

- Apresentação da Plataforma: Seção de boas-vindas que descreve a proposta de valor do EduCollab.

- Formulário de Login: Janela modal para que usuários existentes possam entrar no sistema.

- Formulário de Cadastro Interativo: Um modal de registro com lógica em JavaScript que:

- Adapta os campos do formulário com base na seleção de perfil (Aluno ou Professor).

- Valida se todos os campos foram preenchidos antes de habilitar o botão de cadastro.

- Navegação Suave: Efeito de rolagem suave para as âncoras internas da página.

📂 Estrutura do Projeto
```Bash

├── index.html       # Estrutura principal da página de apresentação
├── style.css        # Folha de estilos customizada
└── script.js        # Lógica de interatividade e validação dos formulários
```

📌 Observações
Esta é a versão estática da Landing Page. Os processos de login e cadastro são simulações implementadas com JavaScript e não possuem, no momento, integração com um back-end ou banco de dados.
