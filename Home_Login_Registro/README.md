# ⚛️ EduCollab - Landing Page (Versão React)

Este diretório contém os arquivos da **Landing Page** do projeto EduCollab, migrada de uma versão estática (HTML/CSS/JS) para uma aplicação moderna em **React com Vite**.

### ⚠️ Observação Importante
Estes não são um projeto React completo por si só. São apenas os arquivos principais da aplicação (`src/`, etc.). Para executar o projeto, é necessário primeiro criar uma estrutura de projeto React com Vite e depois aplicar estes arquivos, seguindo os passos abaixo.

---

### Pré-requisitos (Passo 0)
Antes de começar, garanta que você tenha o **Node.js** e o **npm** instalados na sua máquina.

1.  **Instale o Node.js (LTS):** [nodejs.org](https://nodejs.org/)
2.  **Verifique a instalação** abrindo um terminal e rodando os comandos:
    ```bash
    node -v
    npm -v
    ```
    Ambos devem retornar um número de versão.

---

### Passo 1 — Criar o Projeto React com Vite
Se você ainda não tem um projeto, crie um novo usando Vite.

1.  No seu terminal, navegue até a pasta onde você guarda seus projetos (ex: `Desktop`).
2.  Execute o assistente de criação do Vite:
    ```bash
    npm create vite@latest
    ```
3.  Responda às perguntas do assistente:
    - **Project name:** `educollab-landing-page` (ou o nome que preferir)
    - **Select a framework:** `React`
    - **Select a variant:** `JavaScript`
4.  Acesse a pasta do projeto que acabou de ser criada:
    ```bash
    cd educollab-landing-page
    ```

---

### Passo 2 — Aplicar os Arquivos da Landing Page
Agora, vamos substituir os arquivos padrão do Vite pelos arquivos deste projeto.

1.  **Baixe** os arquivos da Landing Page
2.  Dentro da pasta do seu projeto recém-criado (`educollab-landing-page`), **apague a pasta `src`** que o Vite gerou.
3.  **Copie a pasta `src`** deste projeto para dentro do seu `educollab-landing-page`.

O resultado deve ser que a pasta `src` original foi completamente substituída pela nova.

---

### Passo 3 — Configurar o HTML e Estilos Externos
Esta versão utiliza **Bootstrap** e **Font Awesome** via CDN para agilizar a estilização.

1.  Abra o arquivo `index.html` que está na raiz do seu projeto Vite.
2.  **Dentro da tag `<head>`**, adicione as seguintes linhas para importar os estilos:
    ```html
    <link href="[https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css)" rel="stylesheet">
    <link href="[https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css)" rel="stylesheet">
    ```
3.  **Antes de fechar a tag `</body>`**, adicione a seguinte linha para os scripts do Bootstrap (necessário para dropdowns e modais):
    ```html
    <script src="[https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js)"></script>
    ```
*(**Nota:** Como estamos usando CDN, não é necessário rodar `npm install bootstrap`.)*

---

### Passo 4 — Instalar Dependências e Executar

1.  Com o terminal ainda aberto na pasta do seu projeto (`educollab-landing-page`), instale as dependências padrão do React:
    ```bash
    npm install
    ```
2.  Após a instalação, inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Abra seu navegador e acesse o endereço local que apareceu no terminal (geralmente **http://localhost:5173/**).

A aplicação agora deve estar rodando!

