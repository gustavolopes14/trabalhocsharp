using Microsoft.EntityFrameworkCore;
using GymTrack.Data;
using GymTrack.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gymtrack.db"));

builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.ReferenceHandler = 
        System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

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

app.MapGet("/fichas/aluno/{alunoId}", async (int alunoId, AppDbContext db) =>
    await db.FichasTreino
        .Where(f => f.AlunoId == alunoId)
        .Include(f => f.PlanoTreino)
        .Include(f => f.Exercicios)
        .ToListAsync());

app.MapPost("/fichas", async (FichaTreinoDto dto, AppDbContext db) =>
{
    var aluno = await db.Alunos.FindAsync(dto.AlunoId);
    if (aluno is null) return Results.NotFound("Aluno não encontrado");

    var plano = await db.PlanosTreino.FindAsync(dto.PlanoTreinoId);
    if (plano is null) return Results.NotFound("Plano não encontrado");

    var exercicios = await db.Exercicios
        .Where(e => dto.ExercicioIds.Contains(e.Id))
        .ToListAsync();

    var ficha = new FichaTreino
    {
        AlunoId = dto.AlunoId,
        PlanoTreinoId = dto.PlanoTreinoId,
        Exercicios = exercicios
    };

    db.FichasTreino.Add(ficha);
    await db.SaveChangesAsync();
    return Results.Created($"/fichas/{ficha.Id}", ficha);
});

app.Run();

public record FichaTreinoDto(int AlunoId, int PlanoTreinoId, List<int> ExercicioIds);