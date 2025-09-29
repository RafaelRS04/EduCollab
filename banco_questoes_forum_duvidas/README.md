-----

# Guia Rápido de Instalação - EduCollab React

Este guia mostra como configurar o ambiente e executar o projeto a partir do zero, apenas copiando a pasta `src`.

## Passo 1: Crie uma nova aplicação React

Primeiro, use o comando abaixo no seu terminal para criar a estrutura inicial de um projeto React.

```bash
npx create-react-app meu-app-educollab
```

Depois que o comando terminar, acesse a nova pasta criada:

```bash
cd meu-app-educollab
```

## Passo 2: Instale as dependências extras

O projeto precisa de algumas bibliotecas adicionais. Execute o comando abaixo para instalá-las:

```bash
npm install react-router-dom bootstrap bootstrap-icons
```

## Passo 3: Copie a pasta `src`

Agora, faça o seguinte:

1.  **Delete** a pasta `src` que foi criada automaticamente dentro de `meu-app-educollab`.
2.  **Copie** a pasta `src` do nosso projeto (a que contém todos os nossos componentes e páginas) para dentro da pasta `meu-app-educollab`.

## Passo 4: Inicie a aplicação

Com tudo no lugar, execute o comando abaixo para iniciar o projeto:

```bash
npm start
```

Pronto\! A aplicação será iniciada e aberta no seu navegador em `http://localhost:3000`.
