import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import PlanoTreino from "../../../models/PlanoTreino";

function AlterarPlano() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erro, setErro] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarPlano();
    }, []);

    async function buscarPlano() {
        try {
            const resposta = await api.get<PlanoTreino[]>("/planos");
            const plano = resposta.data.find((p) => p.id === Number(id));
            if (plano) {
                setNome(plano.nome);
                setDescricao(plano.descricao);
            }
        } catch (error) {
            setErro("Plano não encontrado.");
        }
    }

    async function enviarAlteracao(e: any) {
        e.preventDefault();
        setErro("");

        if (!nome) {
            setErro("O nome é obrigatório.");
            return;
        }

        try {
            const plano: PlanoTreino = { nome, descricao };
            await api.put(`/planos/${id}`, plano);
            navigate("/planos");
        } catch (error) {
            setErro("Erro ao alterar plano.");
        }
    }

    return (
        <div className="container">
            <h1>Alterar Plano de Treino</h1>
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
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
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

export default AlterarPlano;
