using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using System.ComponentModel.DataAnnotations;
using Services.Validation;
using Exceptions;
using Services;

namespace bakeryServer.Services
{
    public class ToppingService(IRepository<Topping> repo): IEntityService<Topping>
    {
        private readonly IRepository<Topping> _repo = repo;
        public async Task<Topping> Create(Topping entity)
        {
            var validator = new EntityValidator<Topping>();

            if (!validator.AssertFields(entity) || entity is null)
            {
                throw new ArgumentException("Invalid Entity");
            }

            await _repo.Create(entity);
            return entity;
        }

        public async Task<Topping> ReadOne(int id)
        {
            var entity = await _repo.ReadOne(id);
            if (entity is null)
            {
                throw new NotFoundException();
            }
            return entity;
        }

        public async Task<IEnumerable<Topping?>> ReadAll()
        {
            var list = await _repo.ReadAll();
            if(list.Count == 0)
            {
                throw new NotFoundException();
            }
            return list;
        }

        public async Task Update(Topping newEntity)
        {
            var entityForUpdate = await ReadOne(newEntity.Id);
            if (entityForUpdate is null)
            {
                throw new NotFoundException();
            }

            if(newEntity is null || newEntity.Name is null)
            {
                throw new ArgumentException("Invalid Entity");
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
