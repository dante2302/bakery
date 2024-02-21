using Microsoft.EntityFrameworkCore;
using bakeryServer.Models;
using Microsoft.Extensions.Configuration;

namespace bakeryServer.Data.DbContexts
{
    public class BakeryContext : DbContext
    {
        public DbSet<Filling> Fillings { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<FoodType> FoodTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(Configuration.Manager.GetConnectionString("bakery"));
        }
    }
}
