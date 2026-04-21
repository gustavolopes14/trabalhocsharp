namespace GymTrack.Models;

public class PlanoTreino
{
    public int Id { get; set; }
    public string Nome {get; set;} = string.Empty;
    public string Descricao { get; set; } = string.Empty;

    public ICollection<FichaTreino> FichasTreino { get; set; } = new List<FichaTreino>();
}