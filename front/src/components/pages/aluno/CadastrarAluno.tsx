import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Aluno from "../../../models/Aluno";

function CadastrarAluno() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate();

    async function enviarAluno(e: any) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!nome || !email || !dataNascimento) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const aluno: Aluno = { nome, email, dataNascimento };
            await api.post("/alunos", aluno);
            setSucesso("Aluno cadastrado com sucesso!");
            setNome("");
            setEmail("");
            setDataNascimento("");
            setTimeout(() => navigate("/"), 1000);
        } catch (error: any) {
            if (error.response?.status === 500) {
                setErro("Email já cadastrado.");
            } else {
                setErro("Erro ao cadastrar aluno.");
            }
        }
    }

    return (
        <div className="container">
            <h1>Cadastrar Aluno</h1>
            {sucesso && <p className="sucesso">{sucesso}</p>}
            <form onSubmit={enviarAluno}>
                <div>
                    <label>Nome: *</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome completo"
                    />
                </div>
                <div>
                    <label>Email: *</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@exemplo.com"
                    />
                </div>
                <div>
                    <label>Data de Nascimento: *</label>
                    <input
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />
                </div>
                {erro && <p className="erro">{erro}</p>}
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarAluno;
