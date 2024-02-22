using bakeryServer.Models;
using bakeryServer.Data.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class ToppingRepo(BakeryContext context) : IRepository<Topping>
    {
        private readonly BakeryContext _context = context;

        public async Task<Topping> Create(Topping topping)
        {
            await _context.AddAsync(topping);
            await _context.SaveChangesAsync();
            return topping;
        }

        public async Task<Topping?> ReadOne(int id)
        {
            Topping? topping = await _context.Toppings.FirstOrDefaultAsync(t => t.Id == id);
            return topping;
        }

        public async Task<IEnumerable<Topping?>> ReadAll()
        {
            return await _context.Toppings.ToListAsync();
        }

        public async Task<bool> Update(Topping newTopping)
        {
            Topping? existingTopping = await _context.Toppings.FirstOrDefaultAsync(t => t.Id == newTopping.Id);
            if (existingTopping is null)
            {
                return false;
            }
            else
            {
                existingTopping.Name = newTopping.Name;
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Delete(Topping topping)
        {
            if (topping is null)
            {
                return false;
            }

            _context.Toppings.Remove(topping);
            await _context.SaveChangesAsync();
            return true;

        }
    }
}
