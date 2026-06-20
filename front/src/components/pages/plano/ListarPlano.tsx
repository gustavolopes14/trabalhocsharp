import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import PlanoTreino from "../../../models/PlanoTreino";

function ListarPlano() {
    const [planos, setPlanos] = useState<PlanoTreino[]>([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        carregarPlanos();
    }, []);

    async function carregarPlanos() {
        try {
            const resposta = await api.get<PlanoTreino[]>("/planos");
            setPlanos(resposta.data);
        } catch (error) {
            setErro("Erro ao carregar planos.");
        }
    }

    async function deletarPlano(id: number) {
        try {
            await api.delete(`/planos/${id}`);
            carregarPlanos();
        } catch (error) {
            setErro("Erro ao deletar plano.");
        }
    }

    return (
        <div className="container">
            <h1>Planos de Treino</h1>
            {erro && <p className="erro">{erro}</p>}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {planos.map((plano) => (
                        <tr key={plano.id}>
                            <td>{plano.id}</td>
                            <td>{plano.nome}</td>
                            <td>{plano.descricao}</td>
                            <td>
                                <button className="btn-deletar" onClick={() => deletarPlano(plano.id!)}>
                                    Deletar
                                </button>
                            </td>
                            <td>
                                <Link className="btn-alterar" to={`/plano/alterar/${plano.id}`}>
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

export default ListarPlano;
