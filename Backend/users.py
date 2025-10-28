from fastapi import APIRouter, HTTPException, Depends
from datetime import timedelta
from pydantic import BaseModel
from typing import Optional
import security
import userdb
import jwt

# Crie uma instância do APIRouter
router = APIRouter()

# -----------------------------------------------------
# MODELOS DE DADOS (SCHEMAS)
# -----------------------------------------------------

class UserBase(BaseModel):
    """ Schema base com campos comuns """
    name: str
    phone: str
    area: Optional[str] = None
    level: Optional[str] = None

class UserCreate(UserBase):
    """ Schema para receber dados na criação (cadastro) """
    email: str
    password: str
    user_type: str  # 'student' ou 'teacher'

class UserInDB(UserBase):
    """ Schema para como o usuário é armazenado no banco de dados """
    email: str
    hashed_password: str
    user_type: str  # 'student' ou 'teacher'

class UserUpdate(UserBase):
    """ Schema update de usuário """
    pass

# -----------------------------------------------------
# FUNÇÕES "HELPER" (Informações Usuários)
# -----------------------------------------------------

async def get_current_user(token: str = Depends(security.oauth2_scheme)):
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
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email: str = payload.get("sub") # 'sub' é o email que salvamos no token
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        # Se o token for inválido (expirado, assinatura errada, etc.)
        raise credentials_exception

    # Busca o usuário no "DB" para garantir que ele existe
    user = userdb.dummydb.get(email)
    if user is None:
        raise credentials_exception

    # Retorna os dados do usuário (como um dicionário)
    return user

# -----------------------------------------------------
# ENDPOINTS RELACIONADOS AOS USUÁRIOS
# -----------------------------------------------------

@router.post("/register", response_model=security.Token)
async def register_user(user: UserCreate):
    """
    Endpoint para cadastrar um novo usuário.
    Recebe os dados do usuário, salva no 'DB' e retorna um security.Token de login.
    """
    
    # 1. Verifica se o usuário já existe no nosso "DB"
    if user.email in userdb.dummydb:
        # 400 Bad Request: O cliente enviou dados inválidos (email duplicado)
        raise HTTPException(
            status_code=400,
            detail="O email já está cadastrado."
        )

    # 2. Criptografa a senha
    hashed_password = security.get_password_hash(user.password)

    # 3. Cria o objeto do usuário como ele será salvo no "DB"
    user_in_db = UserInDB(
        name=user.name,
        phone=user.phone,
        email=user.email,
        hashed_password=hashed_password,
        user_type=user.user_type,
        area=user.area,
        level=user.level
    )

    # 4. "Salva" o usuário no nosso "DB"
    userdb.dummydb[user.email] = user_in_db.model_dump()
    
    print("Novo usuário cadastrado:", userdb.dummydb[user.email])

    # 5. Cria um security.Token de acesso para o usuário
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email, "user_type": user.user_type},
        expires_delta=access_token_expires
    )

    # 6. Retorna o Token
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_type": user.user_type
    }

@router.get("/users/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    """
    Endpoint protegido.

    Só pode ser acessado por um usuário com um token válido.
    Retorna as informações do usuário que está logado.
    """

    # Por segurança, remove o hash da senha antes de retornar
    user_info = current_user.copy()
    user_info.pop("hashed_password", None) 

    return {"message": "Usuário autenticado com sucesso!", "user_data": user_info}

@router.patch("/users/me")
async def update_user_me(
    user_update: UserUpdate, # Recebe os dados do React (JSON)
    current_user: dict = Depends(get_current_user)
):
    """
    Endpoint protegido para atualizar o perfil do usuário logado.
    Recebe um JSON com os campos a serem atualizados.
    """
    
    # Pega o email do usuário logado (do token)
    user_email = current_user["email"]
    
    # Pega os dados atuais do usuário no "DB"
    user_in_db = userdb.dummydb[user_email]
    
    # Converte os dados recebidos (Pydantic) em um dict
    # 'exclude_unset=True' só inclui os campos que o React realmente enviou.
    update_data = user_update.model_dump(exclude_unset=True)
    
    # Atualiza as informações
    user_in_db.update(update_data)
    userdb.dummydb[user_email] = user_in_db
    
    # Retorna o usuário atualizado (sem a senha)
    user_in_db.pop("hashed_password", None)
    return user_in_db