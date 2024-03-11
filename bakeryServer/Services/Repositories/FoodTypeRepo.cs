using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class FoodTypeRepo(BakeryContext context) : IRepository<FoodType>
    {
        private readonly BakeryContext _context = context;

        public async Task Create(FoodType foodType)
        {
            await _context.AddAsync(foodType);
            await _context.SaveChangesAsync();
        }
        

        public async Task<FoodType?> ReadOne(int id)
        {
            FoodType? f = await _context.FoodTypes.FirstOrDefaultAsync(f => f.Id == id);
            return f;
        }

        public async Task<List<FoodType>> ReadAll()
        {
            return await _context.FoodTypes.ToListAsync();
        }

        public async Task Update(FoodType newFoodType, FoodType existingFoodType)
        {
            existingFoodType.Name = newFoodType.Name;
            existingFoodType.Fillings = newFoodType.Fillings;
            existingFoodType.Toppings = newFoodType.Toppings;
            existingFoodType.ContainsLettering = newFoodType.ContainsLettering;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(FoodType foodType)
        {
            _context.FoodTypes.Remove(foodType);
            await _context.SaveChangesAsync();
        }
    }
}
