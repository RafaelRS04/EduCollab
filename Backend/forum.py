from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime
from typing import List
import users 

_teachers_topics: List[dict] = [] 
_students_topics: List[dict] = [] 

# Crie uma instância do APIRouter
router = APIRouter(
    prefix="/forum",
)

# -----------------------------------------------------
# MODELOS DE DADOS (SCHEMAS) DO FÓRUM
# -----------------------------------------------------

class ReplyBase(BaseModel):
    texto: str

class ReplyDisplay(ReplyBase):
    id: str
    autor_nome: str
    data: datetime

class TopicBase(BaseModel):
    titulo: str
    conteudo: str

class TopicCreate(TopicBase):
    pass

class TopicDisplay(TopicBase):
    id: str
    autor_nome: str
    data: datetime
    respostas: List[ReplyDisplay] = []

# -----------------------------------------------------
# ENDPOINTS DO FÓRUM
# -----------------------------------------------------

@router.get("/topics", response_model=List[TopicDisplay])
async def get_all_topics(
    # Só usuários logados podem ver o fórum.
    current_user: dict = Depends(users.get_current_user) 
):
    """
    Lista todos os tópicos do fórum.
    """
    # Retorna a lista de tópicos (em ordem inversa, mais novo primeiro)
    if current_user['user_type'] == 'teacher':
        return sorted(_teachers_topics, key=lambda x: x['data'], reverse=True)
    else:
        return sorted(_students_topics, key=lambda x: x['data'], reverse=True)



@router.post("/topics", response_model=TopicDisplay)
async def create_new_topic(
    topic_data: TopicCreate, # Dados vêm do React (JSON)
    current_user: dict = Depends(users.get_current_user)
):
    """
    Cria um novo tópico no fórum.
    O autor é pego automaticamente do token.
    """
    
    # Pega o nome do usuário logado
    autor_nome = current_user.get("name", "Usuário Anônimo")

    # Monta o novo tópico
    novo_topico = {
        "id": f"topico-{int(datetime.now().timestamp())}",
        "titulo": topic_data.titulo,
        "conteudo": topic_data.conteudo,
        "autor_nome": autor_nome,
        "data": datetime.now(),
        "respostas": []
    }
    
    if current_user['user_type'] == 'teacher':
        _teachers_topics.append(novo_topico)
    else:
        _students_topics.append(novo_topico)

    return novo_topico


@router.get("/topics/{topic_id}", response_model=TopicDisplay)
async def get_topic_details(
    topic_id: str,
    current_user: dict = Depends(users.get_current_user)
):
    """
    Busca os detalhes de um tópico específico pelo ID.
    """

    if current_user['user_type'] == 'teacher':
        topico_encontrado = next((t for t in _teachers_topics if t["id"] == topic_id), None)
    else:
        topico_encontrado = next((t for t in _students_topics if t["id"] == topic_id), None)
    
    if not topico_encontrado:
        raise HTTPException(status_code=404, detail="Tópico não encontrado")
    
    return topico_encontrado

@router.post("/topics/{topic_id}/replies", response_model=ReplyDisplay)
async def add_reply_to_topic(
    topic_id: str,
    reply_data: ReplyBase, # O React só precisa enviar o texto da resposta
    current_user: dict = Depends(users.get_current_user)
):
    """
    Adiciona uma nova resposta a um tópico.
    """

    if current_user['user_type'] == 'teacher':
        topico_encontrado = next((t for t in _teachers_topics if t["id"] == topic_id), None)
    else: 
        topico_encontrado = next((t for t in _students_topics if t["id"] == topic_id), None)
    
    if not topico_encontrado:
        raise HTTPException(status_code=404, detail="Tópico não encontrado")

    autor_nome = current_user.get("name", "Usuário Anônimo")
    
    nova_resposta = {
        "id": f"resp-{int(datetime.now().timestamp())}",
        "texto": reply_data.texto,
        "autor_nome": autor_nome,
        "data": datetime.now()
    }
    
    # Adiciona a resposta à lista de respostas do tópico
    topico_encontrado["respostas"].append(nova_resposta)
    
    return nova_resposta