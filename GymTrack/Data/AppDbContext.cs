using Microsoft.EntityFrameworkCore;
using GymTrack.Models;

namespace GymTrack.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<PlanoTreino> PlanosTreino { get; set; }
    public DbSet<Exercicio> Exercicios { get; set; }
    public DbSet<FichaTreino> FichasTreino { get; set; }
}