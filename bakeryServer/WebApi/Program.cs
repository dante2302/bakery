using System.Text;
using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using bakeryServer.Services;
using bakeryServer.Services.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);







// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<BakeryContext>(options =>
{
    string connectionString = Configuration.Manager.GetConnectionString("bakery");
    // Needs this migrations assembly to manage migrations 
    options.UseSqlServer(connectionString, b => b.MigrationsAssembly("bakeryServer.WebApi"));
});

builder.Services.AddScoped<IRepository<Filling>, FillingRepo>();
builder.Services.AddScoped<FillingService>();

var app = builder.Build();
// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();