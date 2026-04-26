using Microsoft.EntityFrameworkCore;
using GymTrack.Data;
using GymTrack.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Banco de Dados SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gymtrack.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuração do Swagger para testes
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
// PLANOS DE TREINO — Responsável: Gustavo
// ============================================================
app.MapGet("/planos", async (AppDbContext db) =>
    await db.PlanosTreino.Include(p => p.FichasTreino).ToListAsync());

app.MapPost("/planos", async (PlanoTreino plano, AppDbContext db) =>
{
    db.PlanosTreino.Add(plano);
    await db.SaveChangesAsync();
    return Results.Created($"/planos/{plano.Id}", plano);
});

app.MapPut("/planos/{id}", async (int id, PlanoTreino input, AppDbContext db) =>
{
    var plano = await db.PlanosTreino.FindAsync(id);
    if (plano is null) return Results.NotFound();
    
    plano.Nome = input.Nome;
    plano.Descricao = input.Descricao;
    
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/planos/{id}", async (int id, AppDbContext db) =>
{
    var plano = await db.PlanosTreino.FindAsync(id);
    if (plano is null) return Results.NotFound();
    
    db.PlanosTreino.Remove(plano);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// ============================================================
// EXERCICIOS — Responsável: Gustavo
// ============================================================
app.MapGet("/exercicios", async (string? grupo, AppDbContext db) =>
    string.IsNullOrEmpty(grupo)
        ? await db.Exercicios.Include(e => e.FichasTreino).ToListAsync()
        : await db.Exercicios.Where(e => e.GrupoMuscular == grupo).Include(e => e.FichasTreino).ToListAsync());

app.MapPost("/exercicios", async (Exercicio exercicio, AppDbContext db) =>
{
    db.Exercicios.Add(exercicio);
    await db.SaveChangesAsync();
    return Results.Created($"/exercicios/{exercicio.Id}", exercicio);
});

app.MapPut("/exercicios/{id}", async (int id, Exercicio input, AppDbContext db) =>
{
    var exercicio = await db.Exercicios.FindAsync(id);
    if (exercicio is null) return Results.NotFound();

    exercicio.Nome = input.Nome;
    exercicio.Descricao = input.Descricao;
    exercicio.GrupoMuscular = input.GrupoMuscular;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/exercicios/{id}", async (int id, AppDbContext db) =>
{
    var exercicio = await db.Exercicios.FindAsync(id);
    if (exercicio is null) return Results.NotFound();

    db.Exercicios.Remove(exercicio);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// ============================================================
// FICHAS DE TREINO — Responsável: [Próximo Integrante]
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