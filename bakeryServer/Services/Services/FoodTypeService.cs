using bakeryServer.Models;
using bakeryServer.Services.Repositories;

namespace bakeryServer.Services
{
    public class FoodTypeService(FoodTypeRepo repo)
    {
        private readonly FoodTypeRepo _repo = repo;

        public async Task<bool> Create(FoodType foodType)
        {
            return await _repo.Create(foodType);
        }

        public async Task<FoodType> ReadOne(int id)
        {
            return await _repo.ReadOne(id);  
        }

        public async Task<IEnumerable<FoodType?>> ReadAll()
        {
            return await _repo.ReadAll();
        }

        public async Task<bool> Update(FoodType newFoodType)
        {
            return await _repo.Update(newFoodType);
        }

        public async Task<bool> Delete(int id)
        {
            FoodType foodTypeForDeletion = await ReadOne(id);
            return await _repo.Delete(foodTypeForDeletion);
        }

    }
}
