using System.Linq.Expressions;
using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;
namespace bakeryServer.Services.Repositories
{

    public class BaseRepo(BakeryContext context) : IRepository<Base>
    {
        private readonly BakeryContext _context = context;

        public async Task Create(Base fBase)
        {
                await _context.AddAsync(fBase);
                await _context.SaveChangesAsync();
        }

        public async Task<Base?> ReadOne(int id)
        {
            Base? b = await _context.Bases.FirstOrDefaultAsync(f => id == f.Id);
            return b;
        }

        public async Task<Base> ReadOneByCondition(Expression<Func<Base, bool>> expression)
        {
            var b = await _context.Bases.Where(expression).ToListAsync();
            return b[0];
        }

        public async Task<List<Base>> ReadAll()
        {
            return await _context.Bases.ToListAsync();
        }

        public async Task Update(Base newBase, Base baseForUpdate)
        {
            baseForUpdate.Name = newBase.Name;
            await _context.SaveChangesAsync();
            return;
        }

        public async Task Delete(Base baseForDeletion)
        {
            _context.Bases.Remove(baseForDeletion);
            await _context.SaveChangesAsync();
            return;
        }

    }
}
