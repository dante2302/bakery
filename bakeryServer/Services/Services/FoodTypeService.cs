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

        public async Task<FoodType> Create(FoodType entity)
        {
            var validator = new EntityValidator<FoodType>();

            if (!validator.AssertFields(entity) || entity is null)
            {
                throw new ValidationException();
            }

            await _repo.Create(entity);
            return entity;
        }

        public async Task<FoodType> ReadOne(int id)
        {
            var entity = await _repo.ReadOne(id);
            if (entity is null)
            {
                throw new NotFoundException();
            }
            return entity;
        }

        public async Task<IEnumerable<FoodType?>> ReadAll()
        {
            var list = await _repo.ReadAll();
            if(list.Count == 0)
            {
                throw new NotFoundException();
            }
            return list;
        }

        public async Task Update(FoodType newEntity)
        {
            var entityForUpdate = await ReadOne(newEntity.Id);
            if (entityForUpdate is null)
            {
                throw new NotFoundException();
            }

            if(newEntity is null)
            {
                throw new ValidationException();    
            }

            await _repo.Update(newEntity, entityForUpdate);

        }

        public async Task Delete(int id)
        {
            var entityForDeletion = await ReadOne(id);
            await _repo.Delete(entityForDeletion);
        }
    }
}
