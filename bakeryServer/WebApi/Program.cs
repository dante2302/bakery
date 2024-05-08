using System.Text;
using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using bakeryServer.Services;
using bakeryServer.Services.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services;

var builder = WebApplication.CreateBuilder(args);

// ***      AUTH        ***
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


// ***      SERVICES        ***
builder.Services.AddScoped<IRepo<Filling>, Repo<Filling>>();
builder.Services.AddScoped<IRepo<Base>, Repo<Base>>();
builder.Services.AddScoped<IRepo<Topping>, Repo<Topping>>();
builder.Services.AddScoped<IRepo<FoodType>, Repo<FoodType>>();
builder.Services.AddScoped<IRepo<Order>, Repo<Order>>();
builder.Services.AddScoped<IRepo<User>, Repo<User>>();

builder.Services.AddScoped<IEntityService<Filling>, EntityService<Filling>>();
builder.Services.AddScoped<IEntityService<Topping>, EntityService<Topping>>();
builder.Services.AddScoped<IEntityService<FoodType>, EntityService<FoodType>>();
builder.Services.AddScoped<IEntityService<Base>, EntityService<Base>>();
builder.Services.AddScoped<IEntityService<Order>, EntityService<Order>>();
builder.Services.AddScoped<IEntityService<User>, EntityService<User>>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<OrderDTOMapper, OrderDTOMapper>();

var app = builder.Build();

// ***      OTHER MIDDLEWARE      ***
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
