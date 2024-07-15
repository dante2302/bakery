using Models;

namespace Services;

public interface IUserService : IEntityService<User>
{
    Task<User?> CheckIfUserExists(User user);
}
