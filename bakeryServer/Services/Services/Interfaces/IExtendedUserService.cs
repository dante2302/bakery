using bakeryServer.Models;

namespace Services;

public interface IExtendedUserService : IEntityService<User>
{
    User CheckIfUserExists(User user);
}
