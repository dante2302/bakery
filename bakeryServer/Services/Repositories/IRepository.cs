
namespace bakeryServer.Services.Repositories
{
    public interface IRepository<T>    
    {
         Task<bool> Create(T entity);
         Task<T?> ReadOne(int id);
         Task<IEnumerable<T?>> ReadAll();
         Task Update(T updatedEntity, T entityForUpdate);
         Task Delete(T entityForDeletion);
    }
}
