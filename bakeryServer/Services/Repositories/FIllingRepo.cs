using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Microsoft.EntityFrameworkCore;
namespace bakeryServer.Services.Repositories
{

    public class FillingRepo(BakeryContext context) : IRepository<Filling>
    {
        private readonly BakeryContext _context = context;

        public async Task<bool> Create(Filling filling)
        {
            try
            {
                await _context.AddAsync(filling);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Filling?> ReadOne(int id)
        {
            Filling? f = await _context.Fillings.FirstOrDefaultAsync(f => id == f.Id);
            return f;
        }

        public async Task<IEnumerable<Filling?>> ReadAll()
        {
            return await _context.Fillings.ToListAsync();
        }

        public async Task<bool> Update(Filling newFilling)
        {
            Filling? existingFilling = await _context.Fillings.FirstOrDefaultAsync(f => f.Id == newFilling.Id);
            if (existingFilling is null)
            {
                return false;
            }
            else
            {
                existingFilling.Name = newFilling.Name;
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Delete(Filling filling)
        {
            if (filling is null)
            {
                return false;
            }

            _context.Fillings.Remove(filling);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
