using System.ComponentModel.DataAnnotations;

namespace GymTrack.Models;

public class FichaTreino
{
    public int Id { get; set; }

    public DateTime DataCriacao { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "A ficha deve estar vinculada a um aluno")]
    public int AlunoId { get; set; }
    public Aluno? Aluno { get; set; }

    [Required(ErrorMessage = "A ficha deve possuir um plano de treino")]
    public int PlanoTreinoId { get; set; }
    public PlanoTreino? PlanoTreino { get; set; }

    public ICollection<Exercicio> Exercicios { get; set; } = new List<Exercicio>();
}
