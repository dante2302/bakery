using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using bakeryServer.Models;
using bakeryServer.Data.DbContexts;

namespace bakeryServer.Services.Repositories
{
    public class Repo<T> : IRepo<T> where T : class, IEntity
    {
        public Repo(BakeryContext context)
        {
            _context = context;
        }

        DbContext _context;

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
           return eList.FirstOrDefault();
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
            _context.Entry(oldEntity).CurrentValues.SetValues(newEntity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}