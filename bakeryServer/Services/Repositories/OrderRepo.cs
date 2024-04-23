using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    
    public class OrderRepo(BakeryContext context) : IRepository<Order>
    {
        private readonly BakeryContext _context = context;

        public async Task Create(Order order)
        {
            await _context.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<Order?> ReadOne(int id)
        {
            Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            return order;
        }

        public async Task<List<Order>> ReadAll()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task Update(Order newOrder, Order orderForUpdate)
        {
            orderForUpdate.Date = newOrder.Date;
            orderForUpdate.FoodId = newOrder.FoodId;
            orderForUpdate.UserId = newOrder.UserId;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(Order order)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
