import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Exercicio from "../../../models/Exercicio";

function ListarExercicio() {
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    const [grupo, setGrupo] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        carregarExercicios();
    }, []);

    async function carregarExercicios() {
        try {
            const url = grupo ? `/exercicios?grupo=${grupo}` : "/exercicios";
            const resposta = await api.get<Exercicio[]>(url);
            setExercicios(resposta.data);
        } catch (error) {
            setErro("Erro ao carregar exercícios.");
        }
    }

    async function deletarExercicio(id: number) {
        try {
            await api.delete(`/exercicios/${id}`);
            carregarExercicios();
        } catch (error) {
            setErro("Erro ao deletar exercício.");
        }
    }

    return (
        <div className="container">
            <h1>Exercícios</h1>
            {erro && <p className="erro">{erro}</p>}
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Filtrar por grupo muscular"
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                    style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", flex: 1 }}
                />
                <button
                    onClick={carregarExercicios}
                    style={{ background: "#1a1a2e", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                    Filtrar
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Grupo Muscular</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {exercicios.map((exercicio) => (
                        <tr key={exercicio.id}>
                            <td>{exercicio.id}</td>
                            <td>{exercicio.nome}</td>
                            <td>{exercicio.descricao}</td>
                            <td>{exercicio.grupoMuscular}</td>
                            <td>
                                <button className="btn-deletar" onClick={() => deletarExercicio(exercicio.id!)}>
                                    Deletar
                                </button>
                            </td>
                            <td>
                                <Link className="btn-alterar" to={`/exercicio/alterar/${exercicio.id}`}>
                                    Alterar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarExercicio;
