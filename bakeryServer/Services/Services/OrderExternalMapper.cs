using bakeryServer.Models;
using Exceptions;

namespace Services;

public class OrderDTOMapper(IEntityService<Filling> fs, IEntityService<Topping> ts, IEntityService<FoodType> fts, IEntityService<Order> o, Order order)
{
    private readonly Order order = order;
    private readonly IEntityService<Order> _os = o;
    private readonly IEntityService<Filling> _fs = fs;
    private readonly IEntityService<Topping> _ts = ts;
    private readonly IEntityService<FoodType> _fts = fts;
    
    public async Task<OrderDTO> MapFoodContent()
    {
            FoodTypeDTO food = new(await _fts.ReadOne(order.FoodId));
            List<string> fillingNames = await MapFillingNames(order);
            List<string> toppingNames = await MapToppingNames(order);
            OrderDTO odto = new(order, food, fillingNames, toppingNames);
            return odto;
    }

    public async Task<List<string>> MapToppingNames(Order order)
    {
        List<string> toppingNames = [];
        foreach(int toppingId in order.Toppings)
        {
            Topping topping = await _ts.ReadOne(toppingId);
            if(topping is null)
            {
                throw new Exception($"Topping no longer exists. ToppingId:{toppingId}");
            }
            toppingNames.Add(topping.Name);
        }
        return toppingNames;
    }

    public async Task<List<string>> MapFillingNames(Order order)
    {
        List<string> fillingNames = [];
        foreach(int fillingId in order.Fillings)
        {
            Filling filling = await _fs.ReadOne(fillingId);
            if(filling is null)
            {
                throw new Exception($"Topping no longer exists. ToppingId:{fillingId}");
            }
            fillingNames.Add(filling.Name);
        }
        return fillingNames;
    }
}
