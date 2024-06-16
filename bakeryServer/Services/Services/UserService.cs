using Models;
using Repositories;

namespace Services;

public class UserService(IRepo<User> repo) : EntityService<User>(repo), IUserService
{
    public async Task<User?> CheckIfUserExists(User user)
    {
        List<User> users = await _repo.ReadAllByCondition((usr) => usr.PhoneNumber == user.PhoneNumber);

        if (users.Count == 0)
        {
            return null;
        }

        else if (users.Count > 1)
        {
            // cleanup
            return null;
        }

        else
        {
            return users[0];
        }
    }
}