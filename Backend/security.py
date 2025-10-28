from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from typing import Optional
import bcrypt  # Para criptografar senhas
import userdb
import jwt     # Para criar os Tokens de Autenticação (JWT)

# Crie uma instância do APIRouter
router = APIRouter()

# -----------------------------------------------------
# CONFIGURAÇÃO DE SEGURANÇA (Tokens JWT)
# -----------------------------------------------------

SECRET_KEY = "chave-secreta-muito-forte-que-nao-serve-pra-nada-por-que-e-teste" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # O token expira em 30 minutos
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -----------------------------------------------------
# MODELOS DE DADOS (SCHEMAS)
# -----------------------------------------------------

class Token(BaseModel):
    """Schema para retornar o Token de acesso."""
    access_token: str
    token_type: str
    user_type: str

# -----------------------------------------------------
# FUNÇÕES "HELPER" (Segurança e Tokens)
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
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    # 'sub' (subject) é o nome padrão para o identificador do usuário no JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# -----------------------------------------------------
# ENDPOINTS RELACIONADOS À SEGURANÇA
# -----------------------------------------------------

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Endpoint de Login. Recebe email (no campo 'username') e senha.
    Retorna um Token de acesso se as credenciais forem válidas.
    """

    # Busca o usuário no "DB" pelo email (que vem no campo 'username')
    user = userdb.dummydb.get(form_data.username)

    # Verifica se o usuário existe E se a senha está correta
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        # Se o usuário não existe OU a senha está errada, mesma mensagem de erro
        raise HTTPException(
            status_code=401, # 401 Unauthorized
            detail="Email ou senha incorretos",
            # O cabeçalho 'WWW-Authenticate' é parte do padrão OAuth2
            headers={"WWW-Authenticate": "Bearer"}, 
        )

    # Se deu tudo certo, cria um novo token para esta sessão
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "user_type": user["user_type"]},
        expires_delta=access_token_expires
    )

    # Retorna o novo Token
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_type": user["user_type"]
    }