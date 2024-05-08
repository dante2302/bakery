using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class Repo<T>(DbContext context) where T : class, IEntity
    {
        DbContext _context = context;

        public async Task Create(T entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<T?> ReadOne(int id)
        {
            T? e = await _context.Set<T>().FirstOrDefaultAsync(f => id == f.Id);
            return e;
        }

        public async Task<T?> ReadOneByCondition(Expression<Func<T, bool>> exp)
        {
           List<T> eList = await _context.Set<T>().Where(exp).ToListAsync();
           return eList[0];
        }

        public async Task<List<T>> ReadAll()
        {
            List<T> eList = await _context.Set<T>().ToListAsync();
            return eList;
        }

        public async Task<List<T>> ReadAllByCondition(Expression<Func<T, bool>> exp)
        {
           List<T> eList = await _context.Set<T>().Where(exp).ToListAsync();
           return eList;
        }

        public async Task Update(T newEntity, T oldEntity)
        {
            
        }
    }
}