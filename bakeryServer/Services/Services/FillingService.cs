using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Services.Validation;
using System.ComponentModel.DataAnnotations;
using Exceptions;

namespace bakeryServer.Services
{
    public class FillingService(IRepository<Filling> repo)
    {
        private readonly IRepository<Filling> _repo = repo;

        public async Task<Filling> Create(Filling filling)
        {
            var validator = new EntityValidator<Filling>();

            if (!validator.AssertFields(filling) || filling is null)
            {
                throw new ValidationException();
            }

            await _repo.Create(filling);
            return filling;
        }

        public async Task<Filling?> ReadOne(int id)
        {
            var filling = await _repo.ReadOne(id);
            if (filling is null)
            {
                throw new NotFoundException();
            }
            return filling;
        }

        public async Task<IEnumerable<Filling?>> ReadAll()
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
                throw new ValidationException();    
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
