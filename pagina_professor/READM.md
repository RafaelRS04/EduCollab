# EduCollab — Página do Professor (versão React)

Este diretório contém **a evolução da página do professor** (anteriormente feita em Bootstrap) para uma **versão em React**.  
Esta pasta corresponde ao branch `react` do repositório principal e **inclui apenas os arquivos que foram criados ou modificados** para migrar a página para React — ou seja, não é um projeto React completo por si só.

> **Repositórios relacionados:**
> - Versão Bootstrap: [EduCollab/pagina_professor (Bootstrap)](https://github.com/RafaelRS04/EduCollab/tree/bootstrap/pagina_professor)

---

## O que há neste repositório

- Arquivos React (componentes, páginas, assets) que foram **criados ou alterados** para portar a página do professor para React.  
- ⚠️ **Observação importante:** como só foram colocados os arquivos alterados/novos, este diretório **não** contém `package.json`, `node_modules` ou a estrutura completa de um projeto Vite. Você deve aplicar esses arquivos em um projeto React (recomendado: Vite) seguindo os passos abaixo.

---

## Pré-requisitos (Passo 0)

1. Instale o **Node.js (LTS)**: [nodejs.org](https://nodejs.org)
2. Verifique se as ferramentas estão instaladas:

```bash
node -v
npm -v
```
Ambos devem retornar uma versão.

---
## Passo 1 — Criar o projeto React com Vite

Se você ainda não tem um projeto React, crie um com Vite:
```bash
# em um terminal, navegue até a pasta onde quer criar o projeto
cd Desktop

# inicie o assistente do Vite
npm create vite@latest
# Responda: Project name -> meu-app-react
# Select a framework -> React
# Select a variant -> JavaScript

# entre na pasta criada
cd meu-app-react
```
---
## Passo 2 — Instalar dependências

Dentro da pasta do seu projeto React criado **(ex: meu-app-react)**, instale as dependências:
```bash
npm install
```
---
## Passo 3 — Aplicar os arquivos deste repositório ao seu projeto
**Opção A — Criar projeto novo (recomendado)**
```bash
# clona o branch react (shallow clone)
git clone --depth 1 --branch react https://github.com/RafaelRS04/EduCollab.git temp-edu
```

Copie os arquivos de pagina_professor para o seu projeto criado com Vite:

*- Linux/macOS:**
```bash
cp -r temp-edu/pagina_professor/* /caminho/para/meu-app-react/
```

*-Windows (PowerShell):**
```bash
Copy-Item -Path .\temp-edu\pagina_professor\* -Destination .\meu-app-react\ -Recurse -Force
```

Depois, remova a pasta temporária se quiser:
```bash
rm -rf temp-edu
```
**Opção B — Integrar em projeto React existente**

Abra seu projeto React.

Copie manualmente os arquivos deste repositório **(src/ e public/)** para as pastas correspondentes.

Verifique dependências adicionais e instale com 
```bash
npm install <pacote>.
```

---
## Dependências comuns

Se a versão React usa Bootstrap:
```bash
npm install bootstrap
```
E no **src/main.jsx**:
```bash
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```
Se houver rotas:
```bash
npm install react-router-dom
```
---
**Passo 4 — Executar a aplicação**

No diretório do seu projeto React:
```bash
npm run dev
```
Abra o navegador no endereço exibido (geralmente http://localhost:5173/
).

Para gerar versão de produção:
```bash
npm run build
npm run preview
```
---
## Notas

- Este repositório contém apenas arquivos **modificados/novos**.

- Sempre rode **npm install** depois de copiar os arquivos.

- Faça backup antes de substituir arquivos.

- Comandos de cópia diferem entre Windows e Linux/macOS.
