import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Aluno from "../../../models/Aluno";
import PlanoTreino from "../../../models/PlanoTreino";
import Exercicio from "../../../models/Exercicio";
import { FichaTreinoDto } from "../../../models/FichaTreino";

function CadastrarFicha() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [planos, setPlanos] = useState<PlanoTreino[]>([]);
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    const [alunoId, setAlunoId] = useState("");
    const [planoId, setPlanoId] = useState("");
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState<number[]>([]);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {
            const [resAlunos, resPlanos, resExercicios] = await Promise.all([
                api.get<Aluno[]>("/alunos"),
                api.get<PlanoTreino[]>("/planos"),
                api.get<Exercicio[]>("/exercicios"),
            ]);
            setAlunos(resAlunos.data);
            setPlanos(resPlanos.data);
            setExercicios(resExercicios.data);
        } catch (error) {
            setErro("Erro ao carregar dados.");
        }
    }

    function toggleExercicio(id: number) {
        setExerciciosSelecionados((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    }

    async function enviarFicha(e: any) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!alunoId || !planoId || exerciciosSelecionados.length === 0) {
            setErro("Selecione um aluno, um plano e pelo menos um exercício.");
            return;
        }

        try {
            const dto: FichaTreinoDto = {
                alunoId: Number(alunoId),
                planoTreinoId: Number(planoId),
                exercicioIds: exerciciosSelecionados,
            };
            await api.post("/fichas", dto);
            setSucesso("Ficha criada com sucesso!");
            setTimeout(() => navigate("/fichas"), 1000);
        } catch (error) {
            setErro("Erro ao criar ficha de treino.");
        }
    }

    return (
        <div className="container">
            <h1>Criar Ficha de Treino</h1>
            {sucesso && <p className="sucesso">{sucesso}</p>}
            <form onSubmit={enviarFicha}>
                <div>
                    <label>Aluno: *</label>
                    <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
                        <option value="">Selecione um aluno</option>
                        {alunos.map((a) => (
                            <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Plano de Treino: *</label>
                    <select value={planoId} onChange={(e) => setPlanoId(e.target.value)}>
                        <option value="">Selecione um plano</option>
                        {planos.map((p) => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Exercícios: * (selecione um ou mais)</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                        {exercicios.map((ex) => (
                            <label key={ex.id} style={{ fontWeight: "normal", display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                    type="checkbox"
                                    checked={exerciciosSelecionados.includes(ex.id!)}
                                    onChange={() => toggleExercicio(ex.id!)}
                                />
                                {ex.nome} — {ex.grupoMuscular}
                            </label>
                        ))}
                    </div>
                </div>
                {erro && <p className="erro">{erro}</p>}
                <div>
                    <button type="submit">Criar Ficha</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarFicha;
