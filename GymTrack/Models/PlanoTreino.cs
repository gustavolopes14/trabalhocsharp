using System.ComponentModel.DataAnnotations;

namespace GymTrack.Models;

public class PlanoTreino
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome do plano é obrigatório")]
    [StringLength(100)]
    public string Nome { get; set; } = string.Empty;

    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    public ICollection<FichaTreino> FichasTreino { get; set; } = new List<FichaTreino>();
}
