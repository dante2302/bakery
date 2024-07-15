using System.Linq.Expressions;
using Models;

namespace Services;

public interface IEntityService<T> where T : class, IEntity
{
    Task<T> Create(T type);
    Task<T> ReadOne(int id);
    Task<T> ReadOneByCondition(Expression<Func<T, bool>> expression);
    Task<List<T>> ReadAll();
    Task<List<T>> ReadAllByCondition(Expression<Func<T, bool>> expression);
    Task Update(T type);
    Task Delete(int id);
}
