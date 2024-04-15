using bakeryServer.Models;

namespace bakeryServer.Services.Repositories
{
    public interface IUserExtendedRepo : IRepository<User>
    {
        List<User> SearchByPhone(string phoneNumber);
    }
}
