using bakeryServer.Data.DbContexts;
using bakeryServer.Models;
using Microsoft.EntityFrameworkCore;

namespace bakeryServer.Services.Repositories
{
    public class OrderRepo(BakeryContext context) : IRepository<Order>
    {
        private readonly BakeryContext _context = context;

        public async Task<Order> Create(Order order)
        {
            await _context.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> ReadOne(int id)
        {
            Order? order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == id);
            return order;
        }

        public async Task<IEnumerable<Order?>> ReadAll()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<bool> Update(Order newOrder)
        {
            Order? existingOrder = await _context.Orders.FirstOrDefaultAsync(o => o.Id == newOrder.Id);
            if (existingOrder is null)
            {
                return false;
            }
            else
            {
                existingOrder.Date = newOrder.Date;
                existingOrder.FoodId = newOrder.FoodId;
                existingOrder.UserId = newOrder.UserId;
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Delete(Order order)
        {
            if (order is null)
            {
                return false;
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
