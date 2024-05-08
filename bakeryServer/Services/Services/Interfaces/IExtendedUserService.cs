using bakeryServer.Models;

namespace Services;

public interface IExtendedUserService : IEntityService<User>
{
    Task<User?> CheckIfUserExists(User user);
}
