import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import ListarAluno from './components/pages/aluno/ListarAluno';
import CadastrarAluno from './components/pages/aluno/CadastrarAluno';
import AlterarAluno from './components/pages/aluno/AlterarAluno';

import ListarPlano from './components/pages/plano/ListarPlano';
import CadastrarPlano from './components/pages/plano/CadastrarPlano';
import AlterarPlano from './components/pages/plano/AlterarPlano';

import ListarExercicio from './components/pages/exercicio/ListarExercicio';
import CadastrarExercicio from './components/pages/exercicio/CadastrarExercicio';
import AlterarExercicio from './components/pages/exercicio/AlterarExercicio';

import ListarFicha from './components/pages/ficha/ListarFicha';
import CadastrarFicha from './components/pages/ficha/CadastrarFicha';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Alunos</Link></li>
          <li><Link to="/aluno/cadastrar">Cadastrar Aluno</Link></li>
          <li><Link to="/planos">Planos</Link></li>
          <li><Link to="/plano/cadastrar">Cadastrar Plano</Link></li>
          <li><Link to="/exercicios">Exercícios</Link></li>
          <li><Link to="/exercicio/cadastrar">Cadastrar Exercício</Link></li>
          <li><Link to="/fichas">Fichas</Link></li>
          <li><Link to="/ficha/cadastrar">Criar Ficha</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ListarAluno />} />
        <Route path="/aluno/cadastrar" element={<CadastrarAluno />} />
        <Route path="/aluno/alterar/:id" element={<AlterarAluno />} />

        <Route path="/planos" element={<ListarPlano />} />
        <Route path="/plano/cadastrar" element={<CadastrarPlano />} />
        <Route path="/plano/alterar/:id" element={<AlterarPlano />} />

        <Route path="/exercicios" element={<ListarExercicio />} />
        <Route path="/exercicio/cadastrar" element={<CadastrarExercicio />} />
        <Route path="/exercicio/alterar/:id" element={<AlterarExercicio />} />

        <Route path="/fichas" element={<ListarFicha />} />
        <Route path="/ficha/cadastrar" element={<CadastrarFicha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
