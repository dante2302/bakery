using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class morefieldrelationshipdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int[]>(
                name: "UncompatibleFillings",
                table: "Toppings",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AddColumn<int[]>(
                name: "UncompatibleToppings",
                table: "Fillings",
                type: "integer[]",
                nullable: true);

            migrationBuilder.AddColumn<int[]>(
                name: "UncompatableFillings",
                table: "Bases",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.AddColumn<int[]>(
                name: "UncompatableToppings",
                table: "Bases",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UncompatibleFillings",
                table: "Toppings");

            migrationBuilder.DropColumn(
                name: "UncompatibleToppings",
                table: "Fillings");

            migrationBuilder.DropColumn(
                name: "UncompatableFillings",
                table: "Bases");

            migrationBuilder.DropColumn(
                name: "UncompatableToppings",
                table: "Bases");
        }
    }
}
