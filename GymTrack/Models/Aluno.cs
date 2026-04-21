namespace GymTrack.Models;

public class Aluno
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime DataNascimento { get; set; }
    public DateTime DataMatricula { get; set; } = DateTime.Now;

    public ICollection<FichaTreino> FichasTreino { get; set; } = new List<FichaTreino>();

}