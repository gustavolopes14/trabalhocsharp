import { useEffect, useState } from "react";
import api from "../../../services/api";
import Aluno from "../../../models/Aluno";
import FichaTreino from "../../../models/FichaTreino";

function ListarFicha() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [alunoId, setAlunoId] = useState("");
    const [fichas, setFichas] = useState<FichaTreino[]>([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        carregarAlunos();
    }, []);

    async function carregarAlunos() {
        try {
            const resposta = await api.get<Aluno[]>("/alunos");
            setAlunos(resposta.data);
        } catch (error) {
            setErro("Erro ao carregar alunos.");
        }
    }

    async function buscarFichas() {
        if (!alunoId) {
            setErro("Selecione um aluno.");
            return;
        }
        setErro("");
        try {
            const resposta = await api.get<FichaTreino[]>(`/fichas/aluno/${alunoId}`);
            setFichas(resposta.data);
            if (resposta.data.length === 0) {
                setErro("Nenhuma ficha encontrada para este aluno.");
            }
        } catch (error) {
            setErro("Erro ao buscar fichas.");
        }
    }

    return (
        <div className="container">
            <h1>Fichas de Treino</h1>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                <select
                    value={alunoId}
                    onChange={(e) => setAlunoId(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", flex: 1 }}
                >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((a) => (
                        <option key={a.id} value={a.id}>{a.nome}</option>
                    ))}
                </select>
                <button
                    onClick={buscarFichas}
                    style={{ background: "#1a1a2e", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                    Buscar
                </button>
            </div>
            {erro && <p className="erro">{erro}</p>}
            {fichas.map((ficha) => (
                <div key={ficha.id} style={{ background: "#fff", borderRadius: "8px", padding: "20px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <p><strong>Ficha #{ficha.id}</strong></p>
                    <p><strong>Aluno:</strong> {ficha.aluno?.nome}</p>
                    <p><strong>Plano:</strong> {ficha.planoTreino?.nome} — {ficha.planoTreino?.descricao}</p>
                    <p><strong>Criada em:</strong> {ficha.dataCriacao ? new Date(ficha.dataCriacao).toLocaleDateString("pt-BR") : "-"}</p>
                    <p style={{ marginTop: "10px" }}><strong>Exercícios:</strong></p>
                    <ul style={{ marginLeft: "20px", marginTop: "6px" }}>
                        {ficha.exercicios?.map((ex) => (
                            <li key={ex.id}>{ex.nome} — {ex.grupoMuscular}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ListarFicha;
