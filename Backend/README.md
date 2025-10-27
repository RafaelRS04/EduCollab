# EduCollab API - Backend (FastAPI)

Este diretório contém o código-fonte do backend da aplicação EduCollab, desenvolvido com o framework FastAPI em Python. A API é responsável pela lógica de negócios, autenticação, autorização e gerenciamento de dados da plataforma.

## 🚀 Funcionalidades Principais (main.py)

O arquivo `main.py` implementa os seguintes recursos essenciais:

1.  **Autenticação de Usuários:**
    * **Cadastro (`POST /register`):** Permite que novos usuários (alunos ou professores) criem uma conta.
        * Recebe `email`, `password`, `user_type` (e campos opcionais como `level` ou `area`) em formato JSON.
        * Verifica se o email já existe.
        * **Criptografa a senha** usando `bcrypt` antes de salvar (simulado em memória).
        * Retorna um **Token de Acesso JWT** para login automático após o cadastro.
    * **Login (`POST /token`):** Autentica usuários existentes.
        * Segue o padrão OAuth2 "Password Flow", esperando `username` (email) e `password` em formato `x-www-form-urlencoded`.
        * Verifica se o usuário existe e se a senha fornecida corresponde à senha criptografada armazenada.
        * Retorna um **Token de Acesso JWT** válido por um tempo determinado (ex: 30 minutos).

2.  **Autorização Baseada em Token:**
    * **Endpoint Protegido (`GET /users/me`):** Um exemplo de endpoint que **requer autenticação**.
        * Utiliza o esquema `OAuth2PasswordBearer` do FastAPI para esperar um token JWT no cabeçalho `Authorization: Bearer <token>`.
        * A dependência `get_current_user` valida o token (verifica assinatura, expiração e se o usuário existe) antes de permitir o acesso.
        * Retorna as informações do usuário logado (sem a senha criptografada).

3.  **Segurança:**
    * **Hashing de Senhas:** Utiliza a biblioteca `bcrypt` para armazenar senhas de forma segura (nunca em texto puro).
    * **Tokens JWT:** Emprega JSON Web Tokens para gerenciar sessões de usuário de forma stateless, contendo informações do usuário (email, tipo) e data de expiração, assinados com uma chave secreta (`SECRET_KEY`).

4.  **Estrutura e Validação:**
    * Utiliza `Pydantic` para definir "schemas" (modelos) que validam automaticamente os dados de entrada e saída das requisições, garantindo a integridade dos dados.
    * Configuração de **CORS** (`CORSMiddleware`) para permitir que o frontend React (rodando em `http://localhost:3000`) se comunique com a API (rodando em `http://127.0.0.1:8000`).

## 🛠️ Como Executar

1.  **Instalar Dependências:**
    Certifique-se de ter o Python 3.9+ instalado. No terminal, dentro desta pasta, execute:
    ```bash
    pip install "fastapi[all]" uvicorn bcrypt "PyJWT[cryptography]" python-multipart
    ```

2.  **Iniciar o Servidor:**
    ```bash
    uvicorn main:app --reload
    ```
    * `main`: Refere-se ao arquivo `main.py`.
    * `app`: Refere-se à instância `FastAPI()` criada no arquivo.
    * `--reload`: Reinicia o servidor automaticamente após salvar alterações no código.

3.  **Acessar a API:**
    * A API estará disponível em: `http://127.0.0.1:8000`
    * A documentação interativa (Swagger UI) estará em: `http://127.0.0.1:8000/docs`

## ⚠️ Atenção

* **Banco de Dados:** Atualmente, os dados dos usuários são armazenados em um dicionário Python em memória (`fake_users_db`). Isso é **apenas para desenvolvimento e teste**. Para produção, ele **deve** ser substituído por um banco de dados real (ex: PostgreSQL, MongoDB).
* **SECRET_KEY:** A chave secreta (`SECRET_KEY`) usada para assinar os tokens JWT no código é um exemplo. Em produção, ela **deve** ser substituída por uma chave forte e gerenciada de forma segura (ex: variáveis de ambiente).

## 📄 Contexto do Projeto

[cite_start]Este backend atende aos requisitos do Trabalho 2 da disciplina de Desenvolvimento de Aplicações Web [cite: 1, 2][cite_start], focando na criação de uma API com FastAPI [cite: 734][cite_start], integração com frontend [cite: 13][cite_start], implementação de autenticação [cite: 15, 586] [cite_start]e autorização [cite: 16, 587] [cite_start]utilizando padrões como OAuth2 [cite: 207, 272] [cite_start]e JWT[cite: 242].
