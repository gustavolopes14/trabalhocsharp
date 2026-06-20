import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import PlanoTreino from "../../../models/PlanoTreino";

function CadastrarPlano() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate();

    async function enviarPlano(e: any) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!nome) {
            setErro("O nome do plano é obrigatório.");
            return;
        }

        try {
            const plano: PlanoTreino = { nome, descricao };
            await api.post("/planos", plano);
            setSucesso("Plano cadastrado com sucesso!");
            setNome("");
            setDescricao("");
            setTimeout(() => navigate("/planos"), 1000);
        } catch (error) {
            setErro("Erro ao cadastrar plano.");
        }
    }

    return (
        <div className="container">
            <h1>Cadastrar Plano de Treino</h1>
            {sucesso && <p className="sucesso">{sucesso}</p>}
            <form onSubmit={enviarPlano}>
                <div>
                    <label>Nome: *</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Ex: Hipertrofia"
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do plano"
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

export default CadastrarPlano;
