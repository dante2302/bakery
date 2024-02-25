
namespace bakeryServer.Services.Repositories
{
    public interface IRepository<T>    
    {
         Task<bool> Create(T entity);
         Task<T?> ReadOne(int id);
         Task<IEnumerable<T?>> ReadAll();
         Task<bool> Delete(T entity);
         Task<bool> Update(T entity);
    }
}
