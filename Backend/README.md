# EduCollab API - Backend (FastAPI)

Este diretório contém o código-fonte do backend da aplicação EduCollab, desenvolvido com o framework FastAPI em Python. A API é responsável pela lógica de negócios, autenticação, autorização e gerenciamento de dados da plataforma.

## 🚀 Funcionalidades Principais

Os arquivos `users.py` e `security.py` implementam os seguintes recursos essenciais:

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

1.  **Criar Ambiente Virtual:**
    Certifique-se de ter o Python 3.9+ instalado. No terminal, dentro desta pasta, execute:
    ```bash
    python -m venv venv
    ```
    
2.  **Ativar Ambiente Virtual:**
    Esta etapa pode variar de plataforma para plataforma, sendo comum em ambientes POSIX:
    ```bash
    source venv/bin/activate
    ```
    E em sistemas Windows:

    ```bash
    venv\Scripts\activate.bat
    ```

    Se necessário, veja mais informações em [venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html).

3.  **Instalar Dependências:**
    ```bash
    pip install -r requirements.txt
    ```
    Serão instalados os seguintes pacotes, assim como suas dependências:
    * `fastapi[all]`: Framework web de alta performance para construir APIs.
    * `uvicorn`: Servidor ASGI para executar o FastAPI.
    * `bcrypt`: Biblioteca para hashing (armazenamento seguro) de senhas.
    * `PyJWT[cryptography]`: Para criação e verificação de tokens JWT (autenticação).
    * `python-multipart`: Utilizado pelo FastAPI para processar uploads de arquivos.
    * `google-generativeai`: Integração com o Google Gemini.

4.  **Adicionar Gemini API Key:** Num arquivo nomeado `.env`, adicione a chave da API do Gemini (como em `.env.example`).

5.  **Iniciar o Servidor:**
    ```bash
    uvicorn main:app --reload
    ```
    * `main`: Refere-se ao arquivo `main.py`.
    * `app`: Refere-se à instância `FastAPI()` criada no arquivo.
    * `--reload`: Reinicia o servidor automaticamente após salvar alterações no código.

6.  **Acessar a API:**
    * A API estará disponível em: `http://127.0.0.1:8000`
    * A documentação interativa (Swagger UI) estará em: `http://127.0.0.1:8000/docs`

## ⚠️ Atenção

* **Banco de Dados:** Atualmente, os dados dos usuários são armazenados em um dicionário Python em memória. Isso é **apenas para desenvolvimento e teste**. Para produção, ele **deve** ser substituído por um banco de dados real (ex: PostgreSQL, MongoDB).
* **SECRET_KEY:** A chave secreta (`SECRET_KEY`) usada para assinar os tokens JWT no código é um exemplo. Em produção, ela **deve** ser substituída por uma chave forte e gerenciada de forma segura (ex: variáveis de ambiente).