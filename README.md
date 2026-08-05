# GameBackEND

Projeto desenvolvido em **Python** utilizando **FastAPI** e **SQLAlchemy** para construção de uma API REST, integrada a um banco de dados **PostgreSQL**. O projeto possui uma interface Web em **HTML**, **CSS** e **JavaScript** que consome a API para autenticação e gerenciamento de dados.

## Funcionalidades

- Login de usuários
- Cadastro de usuários
- Alteração de usuários
- Listagem de usuários
- Cadastro de jogos
- Alteração de jogos
- Exclusão de jogos
- Listagem de jogos
- Integração Frontend ↔ API REST
- Persistência de dados em PostgreSQL
- Containerização com Docker

## Demonstração

<img width="1919" height="987" alt="Tela de login" src="https://github.com/user-attachments/assets/71b43926-86bf-409d-873e-3eee1c0f6bcf" />

<img width="1918" height="980" alt="Dashboard" src="https://github.com/user-attachments/assets/ce967c7b-448e-4a03-af89-814b15947004" />

<img width="1919" height="980" alt="Gerenciamento de jogos" src="https://github.com/user-attachments/assets/0f9e30c3-c348-4a1f-91ff-83f8d4330d3c" />

## Como executar

Clone o repositório:

```bash
git clone https://github.com/Salts01/GameBackEND.git
cd GameBackEND
```

Suba os containers:

```bash
docker compose up --build
```

A aplicação ficará disponível em:

- Frontend: http://localhost
- Backend: http://localhost:8000
- Swagger: http://localhost:8000/docs

## Tecnologias

### Backend

- Python 3.10
- FastAPI
- SQLAlchemy
- PostgreSQL
- Hashlib

### Frontend

- HTML5
- CSS3
- JavaScript (Fetch API)

### DevOps

- Docker
- Docker Compose

Browser
    │
    ▼
Apache (Docker)
    │
    ▼
FastAPI
    │
    ▼
SQLAlchemy
    │
    ▼
PostgreSQL

## Objetivo do projeto

Este projeto foi desenvolvido como parte do meu processo de aprendizado em desenvolvimento backend, simulando uma aplicação real e aplicando boas práticas de desenvolvimento, como:

- Desenvolvimento de APIs REST com FastAPI
- Integração entre Frontend e Backend utilizando Fetch API
- ORM com SQLAlchemy
- Persistência de dados em PostgreSQL
- Containerização com Docker e Docker Compose
