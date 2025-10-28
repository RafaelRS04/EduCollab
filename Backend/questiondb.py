# -----------------------------------------------------
# SIMULAÇÃO DO BANCO DE DADOS
# -----------------------------------------------------

dummydb = {}

_next_id = 0

def get_next_id():
    """Função auxiliar para obter um novo ID único."""
    global _next_id
    id = _next_id
    _next_id += 1
    return id