using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Moreorderdetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContainsLettering",
                table: "FoodTypes",
                newName: "CanContainLettering");

            migrationBuilder.AddColumn<bool>(
                name: "ContainsLettering",
                table: "Orders",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int[]>(
                name: "Fillings",
                table: "Orders",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.AddColumn<int[]>(
                name: "Toppings",
                table: "Orders",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContainsLettering",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Fillings",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Toppings",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "CanContainLettering",
                table: "FoodTypes",
                newName: "ContainsLettering");
        }
    }
}
