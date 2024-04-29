
using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Services.Validation;
using Exceptions;
using Services;

namespace bakeryServer.Services
{
    public class BaseService(IRepository<Base> repo): IEntityService<Base> 
    {
        private readonly IRepository<Base> _repo = repo;

        public async Task<Base> Create(Base fBase)
        {
            var validator = new EntityValidator<Base>();

            if (!validator.AssertFields(fBase) || fBase is null)
            {
                throw new ArgumentException("Invalid entity");    
            }

            await _repo.Create(fBase);
            return fBase;
        }

        public async Task<Base> ReadOne(int id)
        {
            var filling = await _repo.ReadOne(id);
            if (filling is null)
            {
                throw new NotFoundException();
            }
            return filling;
        }

        public async Task<IEnumerable<Filling>> ReadAll()
        {
            List<Filling> fList = await _repo.ReadAll();
            if(fList.Count == 0)
            {
                throw new NotFoundException();
            }
            return fList;
        }

        public async Task Update(Filling newFilling)
        {
            var fillingForUpdate = await ReadOne(newFilling.Id);
            if (fillingForUpdate is null)
            {
                throw new NotFoundException();
            }

            if(newFilling is null || newFilling.Name is null)
            {
                throw new ArgumentException("Invalid entity");    
            }

            await _repo.Update(newFilling, fillingForUpdate);
        }

        public async Task Delete(int id)
        {
            Filling fillingForDeletion = await ReadOne(id);
            await _repo.Delete(fillingForDeletion);
        }
    }
}
