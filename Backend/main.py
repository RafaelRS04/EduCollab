from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
import bcrypt  # Para criptografar senhas
import jwt     # Para criar os Tokens de Autenticação (JWT)
from datetime import datetime, timedelta

# -----------------------------------------------------
# 1. CONFIGURAÇÃO DE SEGURANÇA (Tokens JWT)
# -----------------------------------------------------
# IMPORTANTE: Mude esta chave! Gere uma chave complexa para produção.
# Use: import os; os.urandom(32).hex() no terminal python
SECRET_KEY = "sua-chave-secreta-muito-forte-aqui" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # O token expira em 30 minutos
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -----------------------------------------------------
# 2. SIMULAÇÃO DO BANCO DE DADOS
# -----------------------------------------------------
# Em um projeto real, isso seria um banco de dados (PostgreSQL, MongoDB, etc.)
# A chave do dicionário será o email do usuário.
fake_users_db = {}

# -----------------------------------------------------
# 3. MODELOS DE DADOS (SCHEMAS)
# -----------------------------------------------------

class UserBase(BaseModel):
    """Schema base com campos comuns."""
    email: str

class UserCreate(UserBase):
    """Schema para receber dados na criação (cadastro)."""
    password: str
    user_type: str  # 'student' ou 'teacher'
    level: Optional[str] = None
    area: Optional[str] = None

class UserInDB(UserBase):
    """Schema para como o usuário é armazenado no 'DB'."""
    hashed_password: str
    user_type: str
    is_active: bool = True
    level: Optional[str] = None
    area: Optional[str] = None

class Token(BaseModel):
    """Schema para retornar o Token de acesso."""
    access_token: str
    token_type: str
    user_type: str

# -----------------------------------------------------
# 4. FUNÇÕES "HELPER" (Segurança e Tokens)
# -----------------------------------------------------

def get_password_hash(password):
    """Cria um hash da senha."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password, hashed_password):
    """Verifica se a senha plana bate com o hash salvo."""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Cria o Token JWT."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    # 'sub' (subject) é o nome padrão para o identificador do usuário no JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Dependência para obter o usuário atual a partir do token JWT.
    Decodifica o token, valida o usuário e retorna seus dados.
    """
    # Exceção padrão para erros de credencial
    credentials_exception = HTTPException(
        status_code=401,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Tenta decodificar o token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub") # 'sub' é o email que salvamos no token
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        # Se o token for inválido (expirado, assinatura errada, etc.)
        raise credentials_exception

    # Busca o usuário no "DB" para garantir que ele existe
    user = fake_users_db.get(email)
    if user is None:
        raise credentials_exception

    # Retorna os dados do usuário (como um dicionário)
    return user

# -----------------------------------------------------
# 5. APLICAÇÃO E ENDPOINTS
# -----------------------------------------------------

app = FastAPI(
    title="EduCollab API",
    description="API para o projeto EduCollab - Desenvolvimento de Aplicações Web"
)

# Define de quais origens (URLs) o Backend aceitará requisições
origins = [
    "http://localhost:3000",  # A URL padrão do seu app React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite as origens da lista
    allow_credentials=True, # Permite cookies (útil para o futuro)
    allow_methods=["*"],    # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],    # Permite todos os cabeçalhos
)

@app.get("/")
def read_root():
    """Endpoint raiz."""
    return {"message": "API do EduCollab está no ar!"}

@app.post("/register", response_model=Token)
async def register_user(user: UserCreate):
    """
    Endpoint para cadastrar um novo usuário.
    Recebe os dados do usuário, salva no 'DB' e retorna um Token de login.
    """
    
    # 1. Verifica se o usuário já existe no nosso "DB"
    if user.email in fake_users_db:
        # 400 Bad Request: O cliente enviou dados inválidos (email duplicado)
        raise HTTPException(
            status_code=400,
            detail="O email já está cadastrado."
        )

    # 2. Criptografa a senha
    hashed_password = get_password_hash(user.password)

    # 3. Cria o objeto do usuário como ele será salvo no "DB"
    user_in_db = UserInDB(
        email=user.email,
        hashed_password=hashed_password,
        user_type=user.user_type,
        level=user.level,
        area=user.area
    )

    # 4. "Salva" o usuário no nosso "DB"
    # (user_in_db.dict() converte o objeto pydantic para um dicionário python)
    fake_users_db[user.email] = user_in_db.dict()
    
    print("Novo usuário cadastrado:", fake_users_db[user.email])

    # 5. Cria um Token de acesso para o usuário (Login automático)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "user_type": user.user_type},
        expires_delta=access_token_expires
    )

    # 6. Retorna o Token
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_type": user.user_type
    }

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Endpoint de Login. Recebe email (no campo 'username') e senha.
    Retorna um Token de acesso se as credenciais forem válidas.
    """

    # 1. Busca o usuário no "DB" pelo email (que vem no campo 'username')
    user = fake_users_db.get(form_data.username)

    # 2. Verifica se o usuário existe E se a senha está correta
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        # Se o usuário não existe OU a senha está errada, damos a mesma
        # mensagem de erro por segurança (para não informar se foi o email ou a senha que errou).
        raise HTTPException(
            status_code=401, # 401 Unauthorized
            detail="Email ou senha incorretos",
            # O cabeçalho 'WWW-Authenticate' é parte do padrão OAuth2
            headers={"WWW-Authenticate": "Bearer"}, 
        )

    # 3. Se deu tudo certo, cria um novo token para esta sessão
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "user_type": user["user_type"]},
        expires_delta=access_token_expires
    )

    # 4. Retorna o novo Token
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_type": user["user_type"]
    }

@app.get("/users/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    """
    Endpoint protegido.

    Só pode ser acessado por um usuário com um token válido.
    Retorna as informações do usuário que está logado.
    """
    # Se o código chegou até aqui, a função get_current_user
    # foi executada com sucesso e 'current_user' contém os dados do usuário.

    # Por segurança, removemos o hash da senha antes de retornar
    user_info = current_user.copy()
    user_info.pop("hashed_password", None) 

    return {"message": "Usuário autenticado com sucesso!", "user_data": user_info}
