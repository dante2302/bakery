
using System.Linq.Expressions;

namespace bakeryServer.Services.Repositories
{
    public interface IRepository<T>    
    {
         Task Create(T entity);
         Task<T> ReadOne(int id);
         T ReadOneByCondition(Expression<Func<T, bool>> expression);
         Task<List<T>> ReadAll();
         Task Update(T updatedEntity, T entityForUpdate);
         Task Delete(T entityForDeletion);
    }
}
