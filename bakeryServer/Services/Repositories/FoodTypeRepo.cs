using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class FoodTypeRepo(BakeryContext context) : IRepository<FoodType>
    {
        private readonly BakeryContext _context = context;

        public async Task<bool> Create(FoodType foodType)
        {
            try
            {
                await _context.AddAsync(foodType);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<FoodType?> ReadOne(int id)
        {
            FoodType? f = await _context.FoodTypes.FirstOrDefaultAsync(f => f.Id == id);
            return f;
        }

        public async Task<List<FoodType?>> ReadAll()
        {
            return await _context.FoodTypes.ToListAsync();
        }

        public async Task<bool> Update(FoodType newFoodType)
        {
            FoodType? existingFoodType = await _context.FoodTypes.FirstOrDefaultAsync(f => f.Id == newFoodType.Id);
            if (existingFoodType is null)
            {
                return false;
            }
            else
            {
                existingFoodType.Name = newFoodType.Name;
                existingFoodType.Fillings = newFoodType.Fillings;
                existingFoodType.Toppings = newFoodType.Toppings;
                existingFoodType.ContainsLettering = newFoodType.ContainsLettering;
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Delete(FoodType foodType)
        {
            if (foodType is null)
            {
                return false;
            }

            _context.FoodTypes.Remove(foodType);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
