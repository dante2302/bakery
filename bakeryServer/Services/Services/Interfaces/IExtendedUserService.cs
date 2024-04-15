using bakeryServer.Models;

namespace Services;

public interface IExtendedUserService
{
    User CheckIfUserExists(User user);
}
