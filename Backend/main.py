from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

# -----------------------------------------------------
# APLICAÇÃO E ROTAS
# -----------------------------------------------------

import questions
import security
import users

app = FastAPI(
    title="EduCollab API",
    description="API para o projeto EduCollab - Desenvolvimento de Aplicações Web"
)

# Define de quais origens (URLs) o Backend aceitará requisições
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite as origens da lista
    allow_credentials=True, # Permite cookies
    allow_methods=["*"],    # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],    # Permite todos os cabeçalhos
)

app.include_router(
    users.router
)

app.include_router(
    security.router
)

app.include_router(
    questions.router
)

@app.get("/")
def read_root():
    """Endpoint raiz"""
    return {"message": "API do EduCollab em funcionamento"}
