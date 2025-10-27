// Define a URL base da sua API (onde o FastAPI está rodando)
const API_URL = 'http://127.0.0.1:8000';

/**
 * Função para fazer Login.
 * O endpoint /token do FastAPI espera dados de formulário (x-www-form-urlencoded),
 * não JSON. Por isso, usamos URLSearchParams.
 */
export const loginUser = async (email, password) => {
    // 1. Formata os dados para o padrão de formulário
    const params = new URLSearchParams();
    params.append('username', email);     // O FastAPI espera 'username', não 'email'
    params.append('password', password);

    // 2. Faz a requisição POST para /token
    const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    // 3. Se a resposta não for OK (ex: erro 401), lança um erro
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Falha no login');
    }

    // 4. Retorna os dados (token)
    return await response.json();
};

/**
 * Função para fazer o Cadastro.
 * O endpoint /register espera dados em JSON, então é mais simples.
 */
export const registerUser = async (userData) => {
    // userData deve ser um objeto, ex:
    // { email: "...", password: "...", user_type: "student", level: "ensino-medio" }
    
    console.log("Tentando cadastrar:", userData); // Log para debug

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Falha no cadastro:", errorData.detail); // Log do erro
        throw new Error(errorData.detail || 'Falha no cadastro');
    }

    const data = await response.json();
    console.log("Cadastro bem-sucedido, token recebido:", data);
    return data;
};

/**
 * Função para buscar os dados do usuário logado (endpoint protegido).
 */
export const getUserProfile = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            // 1. Envia o Token de acesso no cabeçalho de Autorização
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Se o token for inválido ou expirar, o erro será 401
        throw new Error(errorData.detail || 'Sessão inválida');
    }

    return await response.json();
};