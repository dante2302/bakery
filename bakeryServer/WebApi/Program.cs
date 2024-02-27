using bakeryServer.Data.DbContexts;
using bakeryServer.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<BakeryContext>(options =>
{
    string connectionString = Configuration.Manager.GetConnectionString("bakery");
    Console.WriteLine(connectionString);
    // Needs this migrations assembly to manage migrations 
    options.UseSqlServer("stringConnection", b => b.MigrationsAssembly("bakeryServer.WebApi"));
});

builder.Services.AddScoped<FillingService>();
builder.Services.AddScoped<ToppingService>();
builder.Services.AddScoped<FoodTypeService>();

var app = builder.Build();
// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
