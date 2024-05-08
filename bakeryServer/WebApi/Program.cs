using System.Text;
using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using bakeryServer.Services;
using bakeryServer.Services.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Core.Types;
using Services;

var builder = WebApplication.CreateBuilder(args);

// ***      SERVICES        ***

builder.Services.AddAuthentication(o => {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x => {
        x.TokenValidationParameters = new TokenValidationParameters(){
            ValidIssuer = Configuration.Manager["JwtSettings:Issuer"],
            ValidAudience = Configuration.Manager["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(Configuration.Manager["JwtSettings:Key"])
            ),
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
    string connectionString = Configuration.Manager.GetConnectionString("bakery");

    // Needs this migrations assembly to manage migrations 
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly("WebApi"));
});

builder.Services.AddScoped<IRepo<Filling>, Repo<Filling>>();
builder.Services.AddScoped<IEntityService<Filling>, FillingService>();

builder.Services.AddScoped<IRepo<Topping>, Repo<Topping>>();
builder.Services.AddScoped<IEntityService<Topping>, ToppingService>();

builder.Services.AddScoped<IRepo<FoodType>, Repo<FoodType>>();
builder.Services.AddScoped<IEntityService<FoodType>, FoodTypeService>();

builder.Services.AddScoped<IRepo<Base>, Repo<Base>>();
builder.Services.AddScoped<IEntityService<Base>, BaseService>();

builder.Services.AddScoped<IRepo<User>, Repo<User>>();
builder.Services.AddScoped<IEntityService<User>, UserService>();
builder.Services.AddScoped<IExtendedUserService, UserService>();

builder.Services.AddScoped<IRepo<Order>, Repo<Order>>();
builder.Services.AddScoped<IEntityService<Order>, OrderService>();
builder.Services.AddScoped<OrderDTOMapper, OrderDTOMapper>();

var app = builder.Build();

// ***      MIDDLEWARE      ***
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
