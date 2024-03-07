using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;
namespace bakeryServer.Services.Repositories
{

    public class FillingRepo(BakeryContext context) : IRepository<Filling>
    {
        private readonly BakeryContext _context = context;

        public async Task Create(Filling filling)
        {
                await _context.AddAsync(filling);
                await _context.SaveChangesAsync();
        }

        public async Task<Filling?> ReadOne(int id)
        {
            Filling? f = await _context.Fillings.FirstOrDefaultAsync(f => id == f.Id);
            return f;
        }

        public async Task<List<Filling>> ReadAll()
        {
            return await _context.Fillings.ToListAsync();
        }

        public async Task Update(Filling newFilling, Filling fillingForUpdate)
        {
            fillingForUpdate.Name = newFilling.Name;
            await _context.SaveChangesAsync();
            return;
        }

        public async Task Delete(Filling fillingForDeletion)
        {
            _context.Fillings.Remove(fillingForDeletion);
            await _context.SaveChangesAsync();
            return;
        }

    }
}
