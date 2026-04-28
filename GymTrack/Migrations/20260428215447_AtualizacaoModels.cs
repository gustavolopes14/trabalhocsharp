using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymTrack.Migrations
{
    /// <inheritdoc />
    public partial class AtualizacaoModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExercicioFichaTreino_Exercicios_ExerciciosId",
                table: "ExercicioFichaTreino");

            migrationBuilder.DropForeignKey(
                name: "FK_ExercicioFichaTreino_FichasTreino_FichasTreinoId",
                table: "ExercicioFichaTreino");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExercicioFichaTreino",
                table: "ExercicioFichaTreino");

            migrationBuilder.RenameTable(
                name: "ExercicioFichaTreino",
                newName: "FichaExercicios");

            migrationBuilder.RenameIndex(
                name: "IX_ExercicioFichaTreino_FichasTreinoId",
                table: "FichaExercicios",
                newName: "IX_FichaExercicios_FichasTreinoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FichaExercicios",
                table: "FichaExercicios",
                columns: new[] { "ExerciciosId", "FichasTreinoId" });

            migrationBuilder.CreateIndex(
                name: "IX_Alunos_Email",
                table: "Alunos",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FichaExercicios_Exercicios_ExerciciosId",
                table: "FichaExercicios",
                column: "ExerciciosId",
                principalTable: "Exercicios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FichaExercicios_FichasTreino_FichasTreinoId",
                table: "FichaExercicios",
                column: "FichasTreinoId",
                principalTable: "FichasTreino",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FichaExercicios_Exercicios_ExerciciosId",
                table: "FichaExercicios");

            migrationBuilder.DropForeignKey(
                name: "FK_FichaExercicios_FichasTreino_FichasTreinoId",
                table: "FichaExercicios");

            migrationBuilder.DropIndex(
                name: "IX_Alunos_Email",
                table: "Alunos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FichaExercicios",
                table: "FichaExercicios");

            migrationBuilder.RenameTable(
                name: "FichaExercicios",
                newName: "ExercicioFichaTreino");

            migrationBuilder.RenameIndex(
                name: "IX_FichaExercicios_FichasTreinoId",
                table: "ExercicioFichaTreino",
                newName: "IX_ExercicioFichaTreino_FichasTreinoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExercicioFichaTreino",
                table: "ExercicioFichaTreino",
                columns: new[] { "ExerciciosId", "FichasTreinoId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ExercicioFichaTreino_Exercicios_ExerciciosId",
                table: "ExercicioFichaTreino",
                column: "ExerciciosId",
                principalTable: "Exercicios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExercicioFichaTreino_FichasTreino_FichasTreinoId",
                table: "ExercicioFichaTreino",
                column: "FichasTreinoId",
                principalTable: "FichasTreino",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
