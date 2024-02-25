using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class UserRepo(BakeryContext context) :IRepository<User>
    {
        private readonly BakeryContext _context = context;

        public async Task<bool> Create(User user)
        {
            try
            {
                await _context.AddAsync(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<User?> ReadOne(int id)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User?>> ReadAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> Update(User newUser)
        {
            User? existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == newUser.Id);

            if (existingUser is null)
            {
                return false;
            }

            else
            {
                existingUser.FirstName = newUser.FirstName;
                existingUser.LastName = newUser.LastName;
                existingUser.PhoneNumber = newUser.PhoneNumber;
                existingUser.Email = newUser.Email;
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Delete(User user)
        {
            if (user is null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
