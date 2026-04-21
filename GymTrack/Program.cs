using Microsoft.EntityFrameworkCore;
using GymTrack.Data;
using GymTrack.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gymtrack.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// ============================================================
// ALUNOS — Responsável: Yago
// ============================================================
app.MapGet("/alunos", async (AppDbContext db) => 
    await db.Alunos.ToListAsync());

app.MapGet("/alunos/{id}", async (int id, AppDbContext db) =>
    await db.Alunos.FindAsync(id) is Aluno aluno ? Results.Ok(aluno) : Results.NotFound());

app.MapPost("/alunos", async (Aluno aluno, AppDbContext db) =>
{
    db.Alunos.Add(aluno);
    await db.SaveChangesAsync();
    return Results.Created($"/alunos/{aluno.Id}", aluno);
});

app.MapPut("/alunos/{id}", async (int id, Aluno input, AppDbContext db) =>
{
    var aluno = await db.Alunos.FindAsync(id);
    if (aluno is null) return Results.NotFound();
    aluno.Nome = input.Nome;
    aluno.Email = input.Email;
    aluno.DataNascimento = input.DataNascimento;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/alunos/{id}", async (int id, AppDbContext db) =>
{
    var aluno = await db.Alunos.FindAsync(id);
    if (aluno is null) return Results.NotFound();
    db.Alunos.Remove(aluno);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// ============================================================
// PLANOS DE TREINO — Responsável: Rafael
// ============================================================
app.MapGet("/planos", async (AppDbContext db) =>
    await db.PlanosTreino.ToListAsync());

app.MapPost("/planos", async (PlanoTreino plano, AppDbContext db) =>
{
    db.PlanosTreino.Add(plano);
    await db.SaveChangesAsync();
    return Results.Created($"/planos/{plano.Id}", plano);
});

// ============================================================
// EXERCICIOS — Responsável: Rafael
// ============================================================
app.MapGet("/exercicios", async (string? grupo, AppDbContext db) =>
    string.IsNullOrEmpty(grupo)
        ? await db.Exercicios.ToListAsync()
        : await db.Exercicios.Where(e => e.GrupoMuscular == grupo).ToListAsync());

app.MapPost("/exercicios", async (Exercicio exercicio, AppDbContext db) =>
{
    db.Exercicios.Add(exercicio);
    await db.SaveChangesAsync();
    return Results.Created($"/exercicios/{exercicio.Id}", exercicio);
});

// ============================================================
// FICHAS DE TREINO — Responsável: Gustavo
// ============================================================
app.MapGet("/fichas/aluno/{alunoId}", async (int alunoId, AppDbContext db) =>
    await db.FichasTreino
        .Where(f => f.AlunoId == alunoId)
        .Include(f => f.PlanoTreino)
        .Include(f => f.Exercicios)
        .ToListAsync());

app.MapPost("/fichas", async (FichaTreino ficha, AppDbContext db) =>
{
    db.FichasTreino.Add(ficha);
    await db.SaveChangesAsync();
    return Results.Created($"/fichas/{ficha.Id}", ficha);
});

app.Run();