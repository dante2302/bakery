using bakeryServer.Models;
using bakeryServer.Services.Repositories;

namespace bakeryServer.Services
{
    public class OrderService(OrderRepo repo)
    {
        private readonly OrderRepo _repo = repo;
        public async Task<bool> Create(Order order)
        {
            return await _repo.Create(order);
        }

        public async Task<Order> ReadOne(int id)
        {
            return await _repo.ReadOne(id);  
        }

        public async Task<IEnumerable<Order?>> ReadAll()
        {
            return await _repo.ReadAll();
        }

        public async Task<bool> Update(Order newOrder)
        {
            return await _repo.Update(newOrder);
        }

        public async Task<bool> Delete(int id)
        {
            Order orderForDeletion = await ReadOne(id);
            return await _repo.Delete(orderForDeletion);
        }

    }
}
