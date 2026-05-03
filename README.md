# GymTrack — Sistema de Gerenciamento de Academia

Sistema de gerenciamento para academias desenvolvido com C# (.NET 8 Minimal API), Entity Framework Core e SQLite. Permite o cadastro de alunos, planos de treino e exercícios, além da criação de fichas de treino personalizadas vinculadas a cada aluno.

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
- [Como Executar](#como-executar)
- [Endpoints da API](#endpoints-da-api)
- [Uso de IA](#uso-de-ia)

---

## Resumo

> *(Produzido com auxílio de IA — Claude, Anthropic)*

O GymTrack é um sistema de gerenciamento desenvolvido para academias, com o objetivo de organizar e centralizar as informações de alunos, planos de treino, exercícios e fichas personalizadas. A aplicação permite que instrutores e administradores cadastrem alunos, definam planos de treino, registrem exercícios e montem fichas individuais vinculadas a cada aluno — tornando o acompanhamento da evolução mais prático e estruturado. Desenvolvido com C# (Minimal API), Entity Framework e SQLite, o sistema adota uma arquitetura REST com comunicação via JSON, simulando um ambiente real de desenvolvimento de software colaborativo.

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

**[⬆ voltar ao topo](#sumário)**

---

## Descrição das Funcionalidades

> *(Produzido com auxílio de IA — Claude, Anthropic)*

### Alunos

O módulo de alunos é o núcleo do sistema. Permite o cadastro completo com nome, e-mail, data de nascimento e data de matrícula. Possui CRUD completo: é possível inserir novos alunos, listar todos os cadastrados, editar informações e remover registros. Os alunos são a entidade central à qual as fichas de treino ficam vinculadas.

### Planos de Treino

Os planos representam as modalidades ou objetivos disponíveis na academia (ex.: Hipertrofia, Emagrecimento, Condicionamento). Cada plano possui nome e descrição. Possui CRUD completo, permitindo criar, listar, editar e remover planos. Um aluno pode ter uma ficha associada a um plano específico, permitindo organizar os treinos conforme o objetivo de cada pessoa.

### Exercícios

O cadastro de exercícios reúne os movimentos disponíveis para montagem das fichas. Cada exercício possui nome, descrição e grupo muscular trabalhado (ex.: Peito, Costas, Pernas). Possui CRUD completo e permite filtrar exercícios por grupo muscular, facilitando a busca durante a montagem de fichas.

### Fichas de Treino

A ficha de treino é a entidade que integra o sistema: ela vincula um aluno a um plano de treino e lista os exercícios que compõem aquela rotina. Ao criar uma ficha, o instrutor seleciona o aluno, o plano e os exercícios desejados, gerando um registro consultável a qualquer momento. Essa funcionalidade é o principal entregável do sistema, pois transforma os dados cadastrados em algo com utilidade prática real.

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

| Tecnologia | Versão | Uso |
|---|---|---|
| C# / .NET | 8.0 | Backend — Minimal API REST |
| Entity Framework Core | 8.0 | ORM para acesso ao banco de dados |
| SQLite | — | Banco de dados relacional |
| GitHub | — | Versionamento e colaboração |
| JSON | — | Formato de comunicação da API |

**[⬆ voltar ao topo](#sumário)**

---

## Como Executar

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [dotnet-ef (Entity Framework CLI)](https://learn.microsoft.com/ef/core/cli/dotnet)

```bash
dotnet tool install --global dotnet-ef
```

### Executando localmente

```bash
# Clone o repositório
git clone https://github.com/gustavolopes14/trabalhocsharp.git

# Acesse a pasta do projeto
cd trabalhocsharp/GymTrack

# Restaure as dependências
dotnet restore

# Aplique as migrations para criar o banco de dados
dotnet ef database update

# Execute a aplicação
dotnet run
```

A API estará disponível em `http://localhost:5019`.  
A documentação interativa (Swagger) estará em `http://localhost:5019/swagger`.

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

## Uso de IA

**Ferramenta utilizada:** Claude (Anthropic) — [claude.ai](https://claude.ai)

**Forma de uso:**
- Fornecemos ao Claude o enunciado do trabalho, o tema escolhido (sistema de academia), os nomes dos integrantes e as informações do curso.
- Solicitamos a geração do resumo, lista de funcionalidades e descrição detalhada de cada funcionalidade, conforme exigido pelo professor.
- Os prompts foram direcionados para que o texto refletisse fielmente o escopo técnico do projeto (entidades, relacionamentos e tecnologias).
- Também utilizamos o Claude para estruturar o README com base nos repositórios de referência indicados pelo professor.
- O Claude auxiliou na resolução de problemas técnicos durante o desenvolvimento, como configuração do Entity Framework, correção de erros de build e implementação dos relacionamentos.

**Revisões realizadas pela equipe:**
- Verificação da coerência entre as funcionalidades descritas e o que foi efetivamente implementado.
- Ajuste dos nomes das entidades para alinhar com a nomenclatura adotada no código.
- Revisão e complementação dos endpoints da API conforme o desenvolvimento avançou.
- Revisão geral da estrutura do README para garantir conformidade com os critérios de avaliação.

**[⬆ voltar ao topo](#sumário)**
