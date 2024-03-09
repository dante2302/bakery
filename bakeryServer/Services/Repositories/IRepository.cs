
namespace bakeryServer.Services.Repositories
{
    public interface IRepository<T>    
    {
         Task Create(T entity);
         Task<T?> ReadOne(int id);
         Task<List<T>> ReadAll();
         Task Update(T updatedEntity, T entityForUpdate);
         Task Delete(T entityForDeletion);
    }
}
