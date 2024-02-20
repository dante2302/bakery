using Microsoft.EntityFrameworkCore;
using bakeryServer.Models;

namespace bakeryServer.Data.DbContexts
{
    public class ShiftContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(Configuration.Manager.GetConnectionString("bakery"));
        }
    }
}

