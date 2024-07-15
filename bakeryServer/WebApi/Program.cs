using System.Text;
using Data.DbContexts;
using Models;
using Services;
using Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Protocols.Configuration;

var builder = WebApplication.CreateBuilder(args);

try
{
    // ***      AUTH        ***
    builder.Services.AddAuthentication(o =>
    {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
        .AddJwtBearer(x =>
        {
            string issuer = Configuration.Manager["JwtSettings:Issuer"]
                ?? throw new InvalidConfigurationException("No JWT Issuer");

            string audience = Configuration.Manager["JwtSettings:Audience"]
                ?? throw new InvalidConfigurationException("No JWT Audience");

            string key = Configuration.Manager["JwtSettings:Key"]
                ?? throw new InvalidConfigurationException("No JWT Signing Key");

            byte[]? keyBytes = Encoding.UTF8.GetBytes(key);
            x.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true
            };
        });

    builder.Services.AddAuthorization();

    builder.Services.AddControllers().AddNewtonsoftJson();
    builder.Services.AddDbContext<BakeryContext>(options =>
    {
        string? connectionString = Configuration.Manager["ConnectionString"]
            ?? throw new InvalidConfigurationException("Connection String is null");
        // Needs this migrations assembly to manage migrations 
        options.UseNpgsql(connectionString, b => b.MigrationsAssembly("WebApi"));
    });
    var context = builder.Services.BuildServiceProvider().GetService<BakeryContext>();
    context.Database.EnsureCreated();
    context.Database.Migrate();
}
catch (InvalidConfigurationException e)
{
    Console.Write("Invalid Configuration: ");
    Console.WriteLine(e.Message);
    return;
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    return;
}

// ***      SERVICES        ***
builder.Services.AddScoped<IRepo<Filling>, Repo<Filling>>();
builder.Services.AddScoped<IRepo<Base>, Repo<Base>>();
builder.Services.AddScoped<IRepo<Topping>, Repo<Topping>>();
builder.Services.AddScoped<IRepo<FoodType>, Repo<FoodType>>();
builder.Services.AddScoped<IRepo<Order>, Repo<Order>>();
builder.Services.AddScoped<IRepo<User>, Repo<User>>();
builder.Services.AddScoped<IRepo<ContactMessage>, Repo<ContactMessage>>();

builder.Services.AddScoped<IEntityService<Filling>, EntityService<Filling>>();
builder.Services.AddScoped<IEntityService<Topping>, EntityService<Topping>>();
builder.Services.AddScoped<IEntityService<FoodType>, EntityService<FoodType>>();
builder.Services.AddScoped<IEntityService<Base>, EntityService<Base>>();
builder.Services.AddScoped<IEntityService<Order>, EntityService<Order>>();
builder.Services.AddScoped<IEntityService<User>, EntityService<User>>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEntityService<ContactMessage>, EntityService<ContactMessage>>();

builder.Services.AddScoped<OrderDTOMapper, OrderDTOMapper>();

var app = builder.Build();
// ***      OTHER MIDDLEWARE      ***
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();