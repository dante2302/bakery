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
            try
            {
                var validator = new EntityValidator<Filling>();

                if (!validator.AssertFields(filling) || filling is null)
                {
                    throw new ValidationException();
                }

                await _repo.Create(filling);
                return filling;
            }

            catch (ValidationException)
            {
                throw;
            }
        }

        public async Task<Filling?> ReadOne(int id)
        {
            return await _repo.ReadOne(id);  
        }

        public async Task<IEnumerable<Filling?>> ReadAll()
        {
            return await _repo.ReadAll();
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
        }
    }
}
