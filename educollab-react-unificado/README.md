# 📚 EduCollab - Ambiente Educacional Colaborativo

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📝 Descrição

EduCollab é uma plataforma web desenvolvida para conectar professores e alunos em um ambiente de aprendizado colaborativo. A aplicação foi originalmente construída com HTML, CSS e JavaScript puro, e posteriormente migrada para **React.js** para criar uma experiência de usuário mais moderna, reativa e escalável.

O objetivo do projeto é fornecer ferramentas para que professores possam criar e gerenciar conteúdo educacional, como bancos de questões e provas, enquanto os alunos podem utilizar esses recursos para estudar e testar seus conhecimentos.

## ✨ Funcionalidades Principais

A plataforma é dividida em duas áreas principais, cada uma com suas próprias funcionalidades:

### Para Professores:
* **Painel de Controle:** Uma página central com acesso a todas as ferramentas do professor.
* **Edição de Perfil:** Professores podem atualizar suas informações pessoais, como nome, contato e foto de perfil.
* **Banco de Questões:** Uma interface para criar, visualizar e excluir questões de múltipla escolha que ficam disponíveis para os alunos estudarem.
* **Sistema de Provas:** Uma ferramenta robusta para:
    * Criar questões específicas para uma prova.
    * Gerar múltiplas versões de provas aleatórias com base nas questões criadas.
    * Baixar as provas geradas em formato **PDF**.
* **Fórum de Dúvidas:** Um espaço para que professores e alunos possam criar tópicos, postar dúvidas e responder uns aos outros.

### Para Alunos:
* **Painel de Controle:** Uma página de boas-vindas com acesso às ferramentas de estudo.
* **Banco de Questões para Estudo:** Alunos podem visualizar as questões criadas pelos professores, filtrar por matéria e verificar suas respostas em tempo real, recebendo feedback instantâneo.
* **Fórum de Dúvidas:** Acesso ao fórum para tirar dúvidas e interagir com colegas e professores.

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
    * [**React.js**](https://reactjs.org/): Biblioteca principal para a construção da interface de usuário.
    * [**React Router**](https://reactrouter.com/): Para gerenciamento das rotas e navegação entre as páginas (SPA).
    * [**Bootstrap**](https://getbootstrap.com/): Framework CSS para estilização e responsividade.
    * [**Font Awesome**](https://fontawesome.com/): Biblioteca de ícones.
* **Geração de Documentos:**
    * [**jsPDF**](https://github.com/parallax/jsPDF): Para a geração dinâmica de provas em formato PDF.
* **Armazenamento de Dados:**
    * **Browser Local Storage / Session Storage:** Utilizado para persistir os dados do perfil, questões e tópicos do fórum de forma local no navegador do usuário.

## 🚀 Como Executar o Projeto Localmente

Para rodar este projeto em sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/educollab-react-unificado.git](https://github.com/seu-usuario/educollab-react-unificado.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd educollab-react-unificado
    ```

3.  **Instale as dependências:**
    Este comando irá ler o `package.json` e instalar todas as bibliotecas necessárias (React, React Router, jsPDF, etc.).
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    Este comando iniciará a aplicação em modo de desenvolvimento.
    ```bash
    npm start
    ```


## 📂 Estrutura de Arquivos

O projeto está organizado da seguinte forma:

```
educollab-react-unificado/
├── public/              # Contém o index.html principal e arquivos estáticos.
└── src/                 # Contém todo o código-fonte da aplicação React.
    ├── components/      # Componentes reutilizáveis (Navbar, Footer, ActionCard, etc.).
    ├── pages/           # Componentes que representam as páginas da aplicação.
    │   ├── aluno/
    │   ├── login/
    │   ├── professor/
    │   └── forum/
    ├── App.js           # Roteador principal da aplicação.
    ├── index.js         # Ponto de entrada da aplicação React.
    └── *.css            # Arquivos de estilo.
```


