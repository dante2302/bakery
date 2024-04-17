using bakeryServer.Models;

namespace Services;

public class OrderDTOMapper(IEntityService<Filling> fs, IEntityService<Topping> ts, IEntityService<FoodType> fts, IEntityService<Order> o, IEntityService<User> us)
{
    private readonly IEntityService<Filling> _fs = fs;
    private readonly IEntityService<Topping> _ts = ts;
    private readonly IEntityService<FoodType> _fts = fts;
    private readonly IEntityService<User> _us = us;
    
    public async Task<OrderDTO> MapDTO(Order order)
    {
            FoodTypeDTO food = new(await _fts.ReadOne(order.FoodId));
            List<string> fillingNames = await MapFillingNames(order);
            List<string> toppingNames = await MapToppingNames(order);
            UserDTO udto = await MapUserData(order);
            OrderDTO odto = new(order, food, fillingNames, toppingNames, udto);
            return odto;
    }

    private async Task<UserDTO> MapUserData(Order order)
    {
        User userData = await _us.ReadOne(order.UserId);
        if(userData == null)
        {
            throw new Exception("Non existent user!");
            //log;
        }
        UserDTO udto = new(userData);
        return udto;
    }

    private async Task<List<string>> MapToppingNames(Order order)
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

    private async Task<List<string>> MapFillingNames(Order order)
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
