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
        return await _context.Fillings.ToListAsync(); 
    }

    public async Task<bool> Update(Filling newFilling)
    {         
        Filling? existingFilling = await _context.Fillings.FirstOrDefaultAsync<Filling>(f =>  f.Id == newFilling.Id); 
        if(existingFilling is null)
        {
            return false;
        }
        else
        {
            existingFilling.Name = newFilling.Name;
            await _context.SaveChangesAsync();
            return true;
        }
    }

    public async Task<bool> Delete(Filling filling)
    {
        if(filling is null)
        {
            return false;
        }

        _context.Fillings.Remove(filling);
        await _context.SaveChangesAsync();
        return true;
    }

}
