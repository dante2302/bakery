using System.Runtime.InteropServices;

namespace Services;

public interface IEntityService<T>
{
    Task<T> Create(T type);
    Task<T?> ReadOne(int id);
    Task<IEnumerable<T>> ReadAll();
    Task Update(T type);
    Task Delete(int id);
}
