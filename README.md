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
- Cadastro e listagem de **Planos de Treino** (ex.: Musculação, Funcional, Cardio)
- Cadastro e listagem de **Exercícios** com descrição e grupo muscular
- Criação de **Fichas de Treino** vinculadas a um aluno e a um plano, contendo os exercícios selecionados
- Listagem das fichas de treino de um aluno específico
- Consulta de exercícios filtrados por grupo muscular
