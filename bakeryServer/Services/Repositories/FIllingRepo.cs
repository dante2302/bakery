using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Microsoft.EntityFrameworkCore;

public class FillingRepo : IRepository<Filling> 
{
    private readonly BakeryContext _context;

    public FillingRepo(BakeryContext context)
    {
        _context = context;
    }

    public async Task<Filling> Create(Filling filling)
    {
        await _context.AddAsync(filling);
        await _context.SaveChangesAsync();
        return filling;
    }

    public async Task<Filling?> ReadOne(int id)
    {
        Filling? f = await _context.Fillings.FirstOrDefaultAsync<Filling>(f => id == f.Id);
        return f;
    }

    public async Task<IEnumerable<Filling?>> ReadAll()
    {
        return new List<Filling>();
    }
    public async Task<bool> Update(Filling filling)
    {
        return false;
    }

    public async Task<bool> Delete(Filling filling)
    {
        return false;
    }

}
