using Microsoft.EntityFrameworkCore;
using bakeryServer.Models;

namespace bakeryServer.Data.DbContexts
{
    public class BakeryContext : DbContext
    {
        public DbSet<Filling> Fillings { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<FoodType> FoodTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }

        public BakeryContext(DbContextOptions<BakeryContext> options): base(options)
        {

        }
    }
}
