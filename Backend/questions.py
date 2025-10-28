from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List
from enum import Enum
import questiondb
import users    

# Crie uma instância do APIRouter
router = APIRouter()

# -----------------------------------------------------
# MODELOS DE DADOS (SCHEMAS)
# -----------------------------------------------------

class AwnswerOptions(str, Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"

class QuestionBase(BaseModel):
    materia: str
    enunciado: str
    alternativas: List[str]
    resposta: AwnswerOptions

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int

# -----------------------------------------------------
# ENDPOINTS RELACIONADOS ÀS QUESTÕES
# -----------------------------------------------------

@router.get("/questions", response_model=List[Question])
async def get_questions(current_user: dict = Depends(users.get_current_user)):
    """ GET: Retorna todas as questões para um usuário logado """

    questions = list(questiondb.dummydb.values()) 

    return questions

@router.post("/question", response_model=Question, status_code=status.HTTP_201_CREATED)
async def create_question(
    question_data: QuestionCreate,
    current_user: dict = Depends(users.get_current_user)
):
    """ POST: Cria uma nova questão para o professor """
    
    # Verifica permissão do usuário
    if current_user['user_type'] != 'teacher':
        raise HTTPException(status_code=404, detail="Apenas professores podem criar questões")

    id = questiondb.get_next_id()
    
    new_question = Question(
        id=id,
        **question_data.model_dump() # Desempacota os campos de QuestionCreate
    )
    
    # "Salva" a questão no nosso banco-dicionário
    questiondb.dummydb[id] = new_question
    
    return new_question

@router.delete("/question/{question_id}", response_model=Question)
async def delete_question(
    question_id: int,
    current_user: dict = Depends(users.get_current_user)
):
    """ DELETE: Deleta uma questão se for professor """

    # Verifica permissão do usuário
    if current_user['user_type'] != 'teacher':
        raise HTTPException(status_code=404, detail="Apenas professores podem deletar questões")

    # Verifica se a questão existe no dict
    if question_id not in questiondb.dummydb:
        raise HTTPException(status_code=404, detail="Questão não encontrada")

    # Deleta do dict e retorna o objeto deletado
    deleted_question = questiondb.dummydb.pop(question_id)
    return deleted_question