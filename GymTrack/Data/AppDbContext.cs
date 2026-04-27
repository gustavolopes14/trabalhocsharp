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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<FichaTreino>()
            .HasMany(f => f.Exercicios)
            .WithMany(e => e.FichasTreino)
            .UsingEntity(j => j.ToTable("FichaExercicios"));

        modelBuilder.Entity<Aluno>()
            .HasIndex(a => a.Email)
            .IsUnique();
    }
}
