using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GymTrack.Models;

public class Exercicio
{
    public int Id { get; set; }

    [Required]
    public string Nome { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;

    [Required]
    public string GrupoMuscular { get; set; } = string.Empty;

    [JsonIgnore]
    public ICollection<FichaTreino> FichasTreino { get; set; } = new List<FichaTreino>();
}
