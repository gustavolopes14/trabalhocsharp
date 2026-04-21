namespace GymTrack.Models;

public class FichaTreino
{
    public int Id { get; set; }
    public DateTime DataCriacao { get; set; } = DateTime.Now;
    
    public int AlunoId { get; set; }
    public Aluno Aluno { get; set; } = null!;
    
    public int PlanoTreinoId { get; set; }
    public PlanoTreino PlanoTreino { get; set; } = null!;

    public ICollection<Exercicio> Exercicios { get; set; } = new List<Exercicio>();
}