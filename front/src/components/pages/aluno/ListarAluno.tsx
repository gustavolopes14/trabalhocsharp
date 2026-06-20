import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Aluno from "../../../models/Aluno";

function ListarAluno() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
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

    async function deletarAluno(id: number) {
        try {
            await api.delete(`/alunos/${id}`);
            carregarAlunos();
        } catch (error) {
            setErro("Erro ao deletar aluno.");
        }
    }

    return (
        <div className="container">
            <h1>Alunos</h1>
            {erro && <p className="erro">{erro}</p>}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data de Nascimento</th>
                        <th>Matrícula</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.dataNascimento ? new Date(aluno.dataNascimento).toLocaleDateString("pt-BR") : "-"}</td>
                            <td>{aluno.dataMatricula ? new Date(aluno.dataMatricula).toLocaleDateString("pt-BR") : "-"}</td>
                            <td>
                                <button className="btn-deletar" onClick={() => deletarAluno(aluno.id!)}>
                                    Deletar
                                </button>
                            </td>
                            <td>
                                <Link className="btn-alterar" to={`/aluno/alterar/${aluno.id}`}>
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

export default ListarAluno;
