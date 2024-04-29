
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
            var fBase = await _repo.ReadOne(id);
            if (fBase is null)
            {
                throw new NotFoundException();
            }
            return fBase;
        }

        public async Task<IEnumerable<Base>> ReadAll()
        {
            List<Base> bList = await _repo.ReadAll();
            if(bList.Count == 0)
            {
                throw new NotFoundException();
            }
            return bList;
        }

        public async Task Update(Base newBase)
        {
            var baseForUpdate = await ReadOne(newBase.Id);
            if (baseForUpdate is null)
            {
                throw new NotFoundException();
            }

            if(newBase is null || newBase.Name is null)
            {
                throw new ArgumentException("Invalid entity");    
            }

            await _repo.Update(newBase, baseForUpdate);
        }

        public async Task Delete(int id)
        {
            Base baseForDeletion = await ReadOne(id);
            await _repo.Delete(baseForDeletion);
        }
    }
}
