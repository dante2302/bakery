using bakeryServer.Models;

namespace bakeryServer.Services.Repositories
{
    public interface IExtendedUserRepo : IRepository<User>
    {
        List<User> SearchByPhone(string phoneNumber);
    }
}
