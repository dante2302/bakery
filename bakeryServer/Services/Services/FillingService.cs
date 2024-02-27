using bakeryServer.Models;
using bakeryServer.Services.Repositories;
using Services.Validation;
using System.Reflection;

namespace bakeryServer.Services
{
    public class FillingService(IRepository<Filling> repo)
    {
        private readonly IRepository<Filling> _repo = repo;

        public async Task<bool> Create(Filling filling)
        {
            try
            {
                if(filling is null)
                {
                    throw new ValidationException();
                }

                var validator = new EntityValidator<Filling>();

                if (!validator.AssertFields(filling))
                {
                    throw new ValidationException();
                }

                await _repo.Create(filling);
                return true;
            }

            catch (ValidationException ex)
            {
                return false;
            }

            catch(Exception ex)
            {
                //log unhandled exception
                return false;
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

        public async Task<bool> Update(Filling newFilling)
        {
            return await _repo.Update(newFilling);
        }

        public async Task<bool> Delete(int id)
        {
            Filling fillingForDeletion = await ReadOne(id);
            return await _repo.Delete(fillingForDeletion);
        }
    }
}
