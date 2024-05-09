
using System.Linq.Expressions;

namespace Repositories;
public interface IRepo<T>
{
    Task Create(T entity);
    Task<T?> ReadOne(int id);
    Task<T?> ReadOneByCondition(Expression<Func<T, bool>> expression);
    Task<List<T>> ReadAll();
    Task<List<T>> ReadAllByCondition(Expression<Func<T, bool>> exp);
    Task Update(T updatedEntity, T entityForUpdate);
    Task Delete(T entityForDeletion);
}