# 📚 EduCollab

Este repositório contém a versão da aplicação web **EduCollab**, desenvolvida utilizando **Bootstrap, HTML e CSS**.

---

## 🚀 Tecnologias Utilizadas  
- [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)  
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)  
- [Bootstrap 5](https://getbootstrap.com/)  

---

## 📂 Estrutura do Projeto  
```bash
src/
├── index.html  # Página principal
├── banco_questoes_aluno.html   # Página do banco de questões na visão do aluno
├── banco_questoes_professor.html   # Página do banco de questões na visão do professor
├── banco_questoes_aluno.html   # Página do fórum de dúvidas
├── forum_professores.html  # Página de fórum entre professores
├── home_professor.html     # Página principal do professor
├── perfil_professor.html   # Página do perfil do professor
├── provas.html     # Página referente a provas: criar questão, crier prova e corrigir prova
├── script.js   # Script da homepage
├── scriptBancoQuestoes.js   # Script do banco de questões
├── scriptForum.js  # Script da página de fórum
├── scriptForumDuvidas.js  # Script da página do fórum de dúvidas
├── scriptPerfil.js     # Script da página de perfil
├── scriptProvas.js     # Script da página de provas
├── style_professor.css   # Style da homepage e banco de questões
├── style.css   # Style da homepage e banco de questões
├── topico_detalhe.html   # Página detalhada para tópicos do fórum de dúvidas
```
---
## ▶️ Como Visualizar

Clone este repositório:

```bash
git clone https://github.com/RafaelRS04/EduCollab.git
```
Acesse a pasta do projeto:
```bash
cd EduCollab/src
```
Abra o arquivo **index.html** no seu navegador.

---
## 📌 Observações

Esta é a versão estática das páginas do projeto (HTML, CSS e Bootstrap).

Futuras versões podem incluir integração com backend e funcionalidades dinâmicas.

---------------------------------------------------------------------------------

## 🌎 EduCollab - Página Principal (Landing Page)
A página principal (Landing Page) da aplicação serve como porta de entrada para a plataforma. Algumas páginas ainda não possuem links de acesso através da landing page.

A página foi projetada para apresentar o EduCollab a novos usuários e permitir o acesso ou registro na plataforma.

- Apresentação da Plataforma: Seção de boas-vindas que descreve a proposta de valor do EduCollab.

- Formulário de Login: Janela modal para que usuários existentes possam entrar no sistema.

- Formulário de Cadastro Interativo: Um modal de registro com lógica em JavaScript que:

- Adapta os campos do formulário com base na seleção de perfil (Aluno ou Professor).

- Valida se todos os campos foram preenchidos antes de habilitar o botão de cadastro.

- Navegação Suave: Efeito de rolagem suave para as âncoras internas da página.

### 📌 Observações
Esta é a versão estática da Landing Page. Os processos de login e cadastro são simulações implementadas com JavaScript e não possuem, no momento, integração com um back-end ou banco de dados.

## 📚 EduCollab - Página do Professor  

A página foi projetada para oferecer ao professor acesso às principais funcionalidades do sistema:  
- 📝 **Gerar Prova**: criação de avaliações de forma simples e organizada.  
- 💬 **Fórum de Professores**: espaço de comunicação e troca de experiências entre docentes.  
- 📂 **Banco de Questões**: armazenamento e consulta de questões para compor provas.

## 🏦 EduCollab - Banco de questões e fórum de dúvidas 

As páginas foram projetadas para oferecer funcionalidades como:  
- 📝 **Cadastro de questões**: permite o professor cadastrar questões para os alunos.  
- 💬 **Teste de conhecimento**: fornece aos alunos as questões dos professores.  
- 📂 **Troca de dúvidas**: no fórum é possível discutir sobre dúvidas.