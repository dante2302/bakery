using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Services.Validation;
using Exceptions;
using Services;
using System.Linq.Expressions;

namespace bakeryServer.Services
{
    public class EntityService<T> : IEntityService<T> where T : class, IEntity
    {
        protected readonly IRepo<T> _repo;
        
        public EntityService(IRepo<T> repo)
        {
            _repo = repo;
        }

        public async Task<T> Create(T entity)
        {
            var validator = new EntityValidator<T>();

            if (!validator.AssertFields(entity) || entity is null)
            {
                throw new ArgumentException("Invalid entity");    
            }

            await _repo.Create(entity);
            return entity;
        }

        public async Task<T> ReadOne(int id)
        {
            var entity = await _repo.ReadOne(id) 
                ?? throw new NotFoundException();
            return entity;
        }

        public async Task<T> ReadOneByCondition(Expression<Func<T, bool>> exp)
        {
            var entity = await _repo.ReadOneByCondition(exp)
                ?? throw new NotFoundException();
            return entity;
        }

        public async Task<List<T>> ReadAll()
        {
            List<T> eList = await _repo.ReadAll();
            if(eList.Count == 0)
            {
                throw new NotFoundException();
            }
            return eList;
        }

        public async Task<List<T>> ReadAllByCondition(Expression<Func<T, bool>> exp)
        {
            List<T> eList = await _repo.ReadAllByCondition(exp);
            if(eList.Count == 0)
            {
                throw new NotFoundException();
            }
            return eList;
        }

        public async Task Update(T newEntity)
        {
            var entityForUpdate = await ReadOne(newEntity.Id)
                ?? throw new NotFoundException();

            if(newEntity is null)
            {
                throw new ArgumentException("Invalid entity");    
            }

            await _repo.Update(newEntity, entityForUpdate);
        }

        public async Task Delete(int id)
        {
            T entityForDeletion = await ReadOne(id)
                ?? throw new NotFoundException();
            await _repo.Delete(entityForDeletion);
        }
    }
}
