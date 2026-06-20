import Aluno from "./Aluno";
import Exercicio from "./Exercicio";
import PlanoTreino from "./PlanoTreino";

export default interface FichaTreino {
    id?: number;
    dataCriacao?: string;
    alunoId: number;
    aluno?: Aluno;
    planoTreinoId: number;
    planoTreino?: PlanoTreino;
    exercicios?: Exercicio[];
}

export interface FichaTreinoDto {
    alunoId: number;
    planoTreinoId: number;
    exercicioIds: number[];
}
