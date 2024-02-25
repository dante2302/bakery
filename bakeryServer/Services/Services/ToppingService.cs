using bakeryServer.Models;
using bakeryServer.Services.Repositories;

namespace bakeryServer.Services
{
    public class ToppingService(ToppingRepo repo)
    {
        private readonly ToppingRepo _repo = repo;
        public async Task<bool> Create(Topping topping)
        {
            return await _repo.Create(topping);
        }

        public async Task<Topping?> ReadOne(int id)
        {
            return await _repo.ReadOne(id);  
        }

        public async Task<IEnumerable<Topping?>> ReadAll()
        {
            return await _repo.ReadAll();
        }

        public async Task<bool> Update(Topping newTopping)
        {
            return await _repo.Update(newTopping);
        }

        public async Task<bool> Delete(int id)
        {
            Topping toppingForDeletion= await ReadOne(id);

            if (toppingForDeletion is null)
            {
                return false;
            }

            return await _repo.Delete(toppingForDeletion);
        }


    }
}
