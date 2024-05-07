using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class UserRepo(BakeryContext context) : IExtendedUserRepo 
    {
        private readonly BakeryContext _context = context;

        public async Task Create(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> ReadOne(int id)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<List<User?>> ReadAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task Update(User newUser, User userForUpdate)
        {
            userForUpdate.FirstName = newUser.FirstName;
            userForUpdate.LastName = newUser.LastName;
            userForUpdate.PhoneNumber = newUser.PhoneNumber;
            userForUpdate.Email = newUser.Email;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public List<User> SearchByPhone(string phoneNumber)
        {
            return [.. _context.Users.Where(x => x.PhoneNumber == phoneNumber)];
        }
    }
}
