using bakeryServer.Data.DbContexts;
using bakeryServer.Models;

namespace bakeryServer.Services
{
    public class OptionService
    {
        private readonly BakeryContext _context = new();

        public async Task Add(Option option)
        {
            _context.Add(option);
            await _context.SaveChangesAsync();
        }

        public async Task<Option> GetOne(int id)
        {
            Option option = await _context.Options.FindAsync(id);
            return option;
        }
    }
}
