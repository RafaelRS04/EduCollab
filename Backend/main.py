from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi import FastAPI

# Carrega variáveis de ambiente
load_dotenv()

# Imports das rotas refatoradas
import forum
import gemini
import questions
import security
import users

app = FastAPI(
    title="EduCollab API",
    description="API para o projeto EduCollab - Desenvolvimento de Aplicações Web"
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(security.router)
app.include_router(questions.router)
app.include_router(forum.router)
app.include_router(gemini.router)

@app.get("/")
def read_root():
    """Endpoint raiz"""
    return {"message": "API do EduCollab em funcionamento com Persistência SQLite"}
