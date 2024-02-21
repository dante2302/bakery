using bakeryServer.Data.DbContexts;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<BakeryContext>(options =>
{
    string connectionString = (Configuration.Manager.GetConnectionString("bakery"));
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly("bakeryServer.WebApi"));
});

var app = builder.Build();
// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
