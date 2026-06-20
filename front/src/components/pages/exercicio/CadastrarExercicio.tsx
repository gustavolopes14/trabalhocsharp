import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Exercicio from "../../../models/Exercicio";

function CadastrarExercicio() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [grupoMuscular, setGrupoMuscular] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate();

    async function enviarExercicio(e: any) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!nome || !grupoMuscular) {
            setErro("Nome e grupo muscular são obrigatórios.");
            return;
        }

        try {
            const exercicio: Exercicio = { nome, descricao, grupoMuscular };
            await api.post("/exercicios", exercicio);
            setSucesso("Exercício cadastrado com sucesso!");
            setNome("");
            setDescricao("");
            setGrupoMuscular("");
            setTimeout(() => navigate("/exercicios"), 1000);
        } catch (error) {
            setErro("Erro ao cadastrar exercício.");
        }
    }

    return (
        <div className="container">
            <h1>Cadastrar Exercício</h1>
            {sucesso && <p className="sucesso">{sucesso}</p>}
            <form onSubmit={enviarExercicio}>
                <div>
                    <label>Nome: *</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex: Supino Reto"
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do exercício"
                    />
                </div>
                <div>
                    <label>Grupo Muscular: *</label>
                    <input
                        type="text"
                        value={grupoMuscular}
                        onChange={(e) => setGrupoMuscular(e.target.value)}
                        placeholder="Ex: Peito, Costas, Pernas"
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

export default CadastrarExercicio;
