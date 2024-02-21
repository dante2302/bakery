using Microsoft.EntityFrameworkCore;
using bakeryServer.Models;


namespace bakeryServer.Data.DbContexts
{
    public class BakeryContext : DbContext
    {
        public DbSet<Option> Options { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer(Configuration.Manager.GetConnectionString("bakery"));
        }
    }
}
