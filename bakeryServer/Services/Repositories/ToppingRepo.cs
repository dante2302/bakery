using bakeryServer.Models;
using bakeryServer.Data.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class ToppingRepo(BakeryContext context) : IRepository<Topping>
    {
        private readonly BakeryContext _context = context;

        public async Task Create(Topping topping)
        {
            await _context.AddAsync(topping);
            await _context.SaveChangesAsync();
        }

        public async Task<Topping?> ReadOne(int id)
        {
            Topping? topping = await _context.Toppings.FirstOrDefaultAsync(t => t.Id == id);
            return topping;
        }

        public async Task<List<Topping?>> ReadAll()
        {
            return await _context.Toppings.ToListAsync();
        }

        public async Task Update(Topping newTopping, Topping toppingForUpdate)
        {
            toppingForUpdate.Name = newTopping.Name;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Topping topping)
        {
            _context.Toppings.Remove(topping);
            await _context.SaveChangesAsync();
        }
    }
}
