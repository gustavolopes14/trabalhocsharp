import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Aluno from "../../../models/Aluno";

function AlterarAluno() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [erro, setErro] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarAluno();
    }, []);

    async function buscarAluno() {
        try {
            const resposta = await api.get<Aluno>(`/alunos/${id}`);
            setNome(resposta.data.nome);
            setEmail(resposta.data.email);
            setDataNascimento(resposta.data.dataNascimento?.split("T")[0] || "");
        } catch (error) {
            setErro("Aluno não encontrado.");
        }
    }

    async function enviarAlteracao(e: any) {
        e.preventDefault();
        setErro("");

        if (!nome || !email) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const aluno: Aluno = { nome, email, dataNascimento };
            await api.put(`/alunos/${id}`, aluno);
            navigate("/");
        } catch (error) {
            setErro("Erro ao alterar aluno.");
        }
    }

    return (
        <div className="container">
            <h1>Alterar Aluno</h1>
            <form onSubmit={enviarAlteracao}>
                <div>
                    <label>Nome: *</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email: *</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />
                </div>
                {erro && <p className="erro">{erro}</p>}
                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

export default AlterarAluno;
