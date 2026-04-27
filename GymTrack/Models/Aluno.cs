using System.ComponentModel.DataAnnotations;

namespace GymTrack.Models;

public class Aluno
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public DateTime DataNascimento { get; set; }
    
    public DateTime DataMatricula { get; set; } = DateTime.Now;

    public ICollection<FichaTreino> FichasTreino { get; set; } = new List<FichaTreino>();
}
