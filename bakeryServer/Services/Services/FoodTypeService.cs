using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using System.ComponentModel.DataAnnotations;
using Services.Validation;
using Exceptions;

namespace bakeryServer.Services
{
    public class FoodTypeService(FoodTypeRepo repo)
    {
        private readonly FoodTypeRepo _repo = repo;

        public async Task<FoodType> Create(FoodType foodType)
        {
            var validator = new EntityValidator<FoodType>();

            if (!validator.AssertFields(foodType) || foodType is null)
            {
                throw new ValidationException();
            }

            await _repo.Create(foodType);
            return foodType;
        }

        public async Task<FoodType> ReadOne(int id)
        {
            var foodType = await _repo.ReadOne(id);
            if (foodType is null)
            {
                throw new NotFoundException();
            }
            return foodType;
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
