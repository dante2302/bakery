using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Services.Validation;
using Exceptions;
using Services;

namespace bakeryServer.Services
{
    public class UserService(IRepository<User> repo): IExtendedUserService
    {
        private readonly IRepository<User> _repo = repo;
        public async Task<User> Create(User entity)
        {
            if (entity is null)
            {
                throw new ArgumentException("Invalid Entity");
            }
            
            await _repo.Create(entity);
            return entity;
        }

        public async Task<User> ReadOne(int id)
        {
            var entity = await _repo.ReadOne(id);
            if (entity is null)
            {
                throw new NotFoundException();
            }
            return entity;
        }

        public async Task<IEnumerable<User>> ReadAll()
        {
            var list = await _repo.ReadAll();
            if(list.Count == 0)
            {
                throw new NotFoundException();
            }
            return list;
        }

        public async Task Update(User newEntity)
        {
            var entityForUpdate = await ReadOne(newEntity.Id);
            if (entityForUpdate is null)
            {
                throw new NotFoundException();
            }

            if(newEntity is null)
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

        public User CheckIfUserExists(User user)
        {
            
            if (_repo is IExtendedUserRepo extendedRepo)
            {
                List<User> users = extendedRepo.SearchByPhone(user.PhoneNumber);

                if (users.Count == 0)
                {
                    return null;
                }

                else if(users.Count > 1)
                {
                    // cleanup
                    return null;
                }

                else
                {
                    return users[0];
                }
            }

            else 
            {
                throw new Exception("Error with dependencies");
            }
        }
    }
}
