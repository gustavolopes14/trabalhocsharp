import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Exercicio from "../../../models/Exercicio";

function AlterarExercicio() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [grupoMuscular, setGrupoMuscular] = useState("");
    const [erro, setErro] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscarExercicio();
    }, []);

    async function buscarExercicio() {
        try {
            const resposta = await api.get<Exercicio[]>("/exercicios");
            const exercicio = resposta.data.find((e) => e.id === Number(id));
            if (exercicio) {
                setNome(exercicio.nome);
                setDescricao(exercicio.descricao);
                setGrupoMuscular(exercicio.grupoMuscular);
            }
        } catch (error) {
            setErro("Exercício não encontrado.");
        }
    }

    async function enviarAlteracao(e: any) {
        e.preventDefault();
        setErro("");

        if (!nome || !grupoMuscular) {
            setErro("Nome e grupo muscular são obrigatórios.");
            return;
        }

        try {
            const exercicio: Exercicio = { nome, descricao, grupoMuscular };
            await api.put(`/exercicios/${id}`, exercicio);
            navigate("/exercicios");
        } catch (error) {
            setErro("Erro ao alterar exercício.");
        }
    }

    return (
        <div className="container">
            <h1>Alterar Exercício</h1>
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
                <div>
                    <label>Grupo Muscular: *</label>
                    <input
                        type="text"
                        value={grupoMuscular}
                        onChange={(e) => setGrupoMuscular(e.target.value)}
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

export default AlterarExercicio;
