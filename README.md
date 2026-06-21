# GymTrack — Sistema de Gerenciamento de Academia

Sistema completo (backend + frontend) para gerenciamento de academias, desenvolvido com C# (.NET 8 Minimal API), Entity Framework Core, SQLite e React com TypeScript. Permite o cadastro de alunos, planos de treino e exercícios, além da criação de fichas de treino personalizadas vinculadas a cada aluno, tudo através de uma interface web funcional.

> Projeto Final — Tópicos Especiais em Sistemas | Análise e Desenvolvimento de Sistemas — Turno Noturno | 2026.01

---

## Integrantes

- Igor Oizumi Ribeiro
- Yago de Oliveira Zacchi
- Rafael da Silva Paiva
- Gustavo Lopes Borges

---

## Sumário

- [Resumo](#resumo)
- [Funcionalidades](#funcionalidades)
- [Descrição das Funcionalidades](#descrição-das-funcionalidades)
- [Entidades e Relacionamentos](#entidades-e-relacionamentos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Como Executar](#como-executar)
- [Endpoints da API](#endpoints-da-api)
- [Telas do Frontend](#telas-do-frontend)
- [Uso de IA](#uso-de-ia)

---

## Resumo

> *(Produzido com auxílio de IA — Claude, Anthropic)*

O GymTrack é um sistema de gerenciamento desenvolvido para academias, com o objetivo de organizar e centralizar as informações de alunos, planos de treino, exercícios e fichas personalizadas. A aplicação permite que instrutores e administradores cadastrem alunos, definam planos de treino, registrem exercícios e montem fichas individuais vinculadas a cada aluno — tornando o acompanhamento da evolução mais prático e estruturado. O backend foi desenvolvido com C# (Minimal API), Entity Framework e SQLite, adotando uma arquitetura REST com comunicação via JSON. O frontend foi desenvolvido em React com TypeScript, consumindo a API através do Axios e oferecendo navegação entre telas com React Router DOM, simulando um ambiente real de desenvolvimento de software full stack e colaborativo.

**[⬆ voltar ao topo](#sumário)**

---

## Funcionalidades

> *(Produzido com auxílio de IA — Claude, Anthropic)*

- Cadastro, listagem, edição e remoção de **Alunos** (CRUD completo)
- Cadastro, listagem, edição e remoção de **Planos de Treino** (CRUD completo)
- Cadastro, listagem, edição e remoção de **Exercícios** com descrição e grupo muscular (CRUD completo)
- Criação de **Fichas de Treino** vinculadas a um aluno e a um plano, contendo os exercícios selecionados
- Listagem das fichas de treino de um aluno específico
- Consulta de exercícios filtrados por grupo muscular
- Interface web completa com navegação entre todas as telas do sistema
- Validações de campos obrigatórios e mensagens de erro no frontend
- Tratamento de respostas da API (sucesso e erro) em todas as telas

**[⬆ voltar ao topo](#sumário)**

---

## Descrição das Funcionalidades

> *(Produzido com auxílio de IA — Claude, Anthropic)*

### Alunos

O módulo de alunos é o núcleo do sistema. Permite o cadastro completo com nome, e-mail, data de nascimento e data de matrícula. Possui CRUD completo: é possível inserir novos alunos, listar todos os cadastrados, editar informações e remover registros. Os alunos são a entidade central à qual as fichas de treino ficam vinculadas. No frontend, a tela de listagem exibe todos os alunos cadastrados com opções de alteração e remoção, enquanto formulários dedicados tratam o cadastro e a edição com validação de campos obrigatórios.

### Planos de Treino

Os planos representam as modalidades ou objetivos disponíveis na academia (ex.: Hipertrofia, Emagrecimento, Condicionamento). Cada plano possui nome e descrição. Possui CRUD completo, permitindo criar, listar, editar e remover planos. Um aluno pode ter uma ficha associada a um plano específico, permitindo organizar os treinos conforme o objetivo de cada pessoa.

### Exercícios

O cadastro de exercícios reúne os movimentos disponíveis para montagem das fichas. Cada exercício possui nome, descrição e grupo muscular trabalhado (ex.: Peito, Costas, Pernas). Possui CRUD completo e permite filtrar exercícios por grupo muscular diretamente na tela de listagem, facilitando a busca durante a montagem de fichas.

### Fichas de Treino

A ficha de treino é a entidade que integra o sistema: ela vincula um aluno a um plano de treino e lista os exercícios que compõem aquela rotina. No frontend, a tela de criação de ficha carrega dinamicamente os alunos, planos e exercícios disponíveis, permitindo selecionar múltiplos exercícios através de checkboxes. A tela de listagem permite buscar as fichas de um aluno específico, exibindo o plano e todos os exercícios vinculados. Essa funcionalidade é o principal entregável do sistema, pois transforma os dados cadastrados em algo com utilidade prática real.

**[⬆ voltar ao topo](#sumário)**

---

## Entidades e Relacionamentos

| Entidade | Descrição |
|---|---|
| `Aluno` | Dados pessoais do aluno da academia |
| `PlanoTreino` | Modalidade ou objetivo do treino |
| `Exercicio` | Movimentos disponíveis com grupo muscular |
| `FichaTreino` | Vincula Aluno + PlanoTreino + Exercícios |

**Relacionamentos:**

- `FichaTreino` → pertence a um `Aluno`
- `FichaTreino` → está associada a um `PlanoTreino`
- `FichaTreino` → contém múltiplos `Exercicios`

**[⬆ voltar ao topo](#sumário)**

---

## Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Uso |
|---|---|---|
| C# / .NET | 8.0 | Backend — Minimal API REST |
| Entity Framework Core | 8.0 | ORM para acesso ao banco de dados |
| SQLite | — | Banco de dados relacional |
| Swagger | — | Documentação e teste interativo da API |

### Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Biblioteca para construção da interface |
| TypeScript | 4.9 | Tipagem estática no frontend |
| React Router DOM | 7 | Navegação entre telas/componentes |
| Axios | 1.16 | Cliente HTTP para consumo da API |
| CSS | — | Estilização visual da aplicação |

### Geral

| Tecnologia | Uso |
|---|---|
| GitHub | Versionamento e colaboração entre os integrantes |
| JSON | Formato de comunicação entre frontend e backend |

**[⬆ voltar ao topo](#sumário)**

---

## Estrutura do Repositório

```
trabalhocsharp/
├── GymTrack/              # Backend — API em C# Minimal API
│   ├── Data/               # AppDbContext
│   ├── Models/              # Entidades (Aluno, PlanoTreino, Exercicio, FichaTreino)
│   ├── Migrations/         # Migrations do Entity Framework
│   └── Program.cs          # Configuração e endpoints da API
├── front/                  # Frontend — React + TypeScript
│   ├── public/
│   └── src/
│       ├── models/          # Interfaces TypeScript das entidades
│       ├── services/        # Configuração do Axios (api.ts)
│       ├── components/pages/  # Telas de Listar/Cadastrar/Alterar por entidade
│       └── App.tsx          # Rotas e navegação
└── README.md
```

**[⬆ voltar ao topo](#sumário)**

---

## Como Executar

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [dotnet-ef (Entity Framework CLI)](https://learn.microsoft.com/ef/core/cli/dotnet)

```bash
dotnet tool install --global dotnet-ef
```

### 1. Clonar o repositório

```bash
git clone https://github.com/gustavolopes14/trabalhocsharp.git
cd trabalhocsharp
```

### 2. Executar o backend (API)

```bash
cd GymTrack

# Restaurar dependências
dotnet restore

# Aplicar as migrations e criar o banco de dados
dotnet ef database update

# Executar a aplicação
dotnet run
```

A API estará disponível em `http://localhost:5019`.
A documentação interativa (Swagger) estará em `http://localhost:5019/swagger`.

### 3. Executar o frontend (React)

Em outro terminal:

```bash
cd front

# Instalar as dependências
npm install

# Executar a aplicação
npm start
```

O frontend estará disponível em `http://localhost:3000` e já consome automaticamente a API rodando em `localhost:5019`.

> **Importante:** o backend precisa estar em execução antes de abrir o frontend, pois todas as telas dependem da API para carregar e salvar dados.

**[⬆ voltar ao topo](#sumário)**

---

## Endpoints da API

### Alunos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/alunos` | Lista todos os alunos |
| GET | `/alunos/{id}` | Busca aluno por ID |
| POST | `/alunos` | Cadastra novo aluno |
| PUT | `/alunos/{id}` | Atualiza dados do aluno |
| DELETE | `/alunos/{id}` | Remove aluno |

### Planos de Treino

| Método | Rota | Descrição |
|---|---|---|
| GET | `/planos` | Lista todos os planos |
| POST | `/planos` | Cadastra novo plano |
| PUT | `/planos/{id}` | Atualiza plano |
| DELETE | `/planos/{id}` | Remove plano |

### Exercícios

| Método | Rota | Descrição |
|---|---|---|
| GET | `/exercicios` | Lista todos os exercícios |
| GET | `/exercicios?grupo={grupo}` | Filtra por grupo muscular |
| POST | `/exercicios` | Cadastra novo exercício |
| PUT | `/exercicios/{id}` | Atualiza exercício |
| DELETE | `/exercicios/{id}` | Remove exercício |

### Fichas de Treino

| Método | Rota | Descrição |
|---|---|---|
| GET | `/fichas/aluno/{alunoId}` | Lista fichas de um aluno |
| POST | `/fichas` | Cria nova ficha de treino |

**[⬆ voltar ao topo](#sumário)**

---

## Telas do Frontend

| Rota | Tela | Descrição |
|---|---|---|
| `/` | Listar Alunos | Lista todos os alunos com opções de editar e excluir |
| `/aluno/cadastrar` | Cadastrar Aluno | Formulário de cadastro com validação |
| `/aluno/alterar/:id` | Alterar Aluno | Formulário de edição pré-preenchido |
| `/planos` | Listar Planos | Lista todos os planos de treino |
| `/plano/cadastrar` | Cadastrar Plano | Formulário de cadastro de plano |
| `/plano/alterar/:id` | Alterar Plano | Formulário de edição de plano |
| `/exercicios` | Listar Exercícios | Lista exercícios com filtro por grupo muscular |
| `/exercicio/cadastrar` | Cadastrar Exercício | Formulário de cadastro de exercício |
| `/exercicio/alterar/:id` | Alterar Exercício | Formulário de edição de exercício |
| `/fichas` | Listar Fichas | Busca e exibe fichas de um aluno selecionado |
| `/ficha/cadastrar` | Criar Ficha | Formulário que integra aluno, plano e exercícios |

Todas as telas possuem validação de campos obrigatórios e tratamento de erros retornados pela API, exibindo mensagens claras ao usuário.

**[⬆ voltar ao topo](#sumário)**

---

## Uso de IA

**Ferramenta utilizada:** Claude (Anthropic) — [claude.ai](https://claude.ai)

**Forma de uso:**
- Fornecemos ao Claude o enunciado do trabalho, o tema escolhido (sistema de academia), os nomes dos integrantes e as informações do curso, tanto na Parte 1 (backend) quanto na Parte 2 (frontend).
- Solicitamos a geração do resumo, lista de funcionalidades e descrição detalhada de cada funcionalidade, conforme exigido pelo professor.
- Os prompts foram direcionados para que o texto refletisse fielmente o escopo técnico do projeto (entidades, relacionamentos, tecnologias de backend e frontend).
- Utilizamos o Claude para estruturar o README com base nos repositórios de referência indicados pelo professor.
- O Claude auxiliou na resolução de problemas técnicos durante o desenvolvimento do backend, como configuração do Entity Framework, correção de erros de build e implementação dos relacionamentos.
- Para o frontend, o Claude gerou a estrutura inicial das telas em React com TypeScript (listagem, cadastro e alteração para cada entidade), seguindo o padrão de projeto demonstrado em aula pelo professor, incluindo a integração com a API via Axios e a configuração de CORS no backend.

**Revisões realizadas pela equipe:**
- Verificação da coerência entre as funcionalidades descritas e o que foi efetivamente implementado.
- Ajuste dos nomes das entidades para alinhar com a nomenclatura adotada no código.
- Revisão e complementação dos endpoints da API conforme o desenvolvimento avançou.
- Teste manual de todas as telas do frontend, validando a comunicação com a API e o tratamento de erros.
- Revisão geral da estrutura do README para garantir conformidade com os critérios de avaliação das Partes 1 e 2.

**[⬆ voltar ao topo](#sumário)**
