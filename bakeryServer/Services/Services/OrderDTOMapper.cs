using Models;
using OneOf;

namespace Services;

public class OrderDTOMapper(
    IEntityService<Filling> fs,
    IEntityService<Topping> ts,
    IEntityService<Base> bs,
    IEntityService<FoodType> fts, 
    IEntityService<User> us
    )
{
    private readonly IEntityService<Filling> _fs = fs;
    private readonly IEntityService<Topping> _ts = ts;
    private readonly IEntityService<FoodType> _fts = fts;
    private readonly IEntityService<User> _us = us;
    private readonly IEntityService<Base> _bs = bs;

    public async Task<OrderDTO> MapDTO(Order order)
    {
        FoodTypeAdminDTO food = new(await _fts.ReadOne(order.FoodId));
        List<Filling> fillings = await MapExtras(_fs, order.Fillings);
        List<string> fillingNames = MapNames(fillings);

        List<Topping> toppings = await MapExtras(_ts, order.Toppings);
        List<string> toppingNames = MapNames(toppings);

        List<Base> bases = await MapExtras(_bs, order.Bases);
        List<string> baseNames = MapNames(bases);

        UserDTO uDTO = await MapUserData(order);
        FoodTypeExtraNames fExtraDTO = new(fillingNames, toppingNames, baseNames);
        OrderDTO oDTO = new(order, food, uDTO, fExtraDTO);
        return oDTO;
    }

    private async Task<UserDTO> MapUserData(Order order)
    {
        User? userData = await _us.ReadOne(order.UserId);
        if(userData == null)
        {
            throw new NullReferenceException("Non existent user!");
            //log;
        }
        UserDTO udto = new(userData);
        return udto;
    }

    private async Task<List<T>> MapExtras<T>(IEntityService<T> _s, int[] ids) where T : class, IEntity
    {
        List<T> extras = [];
        try
        {
            foreach (int id in ids)
            {
                T extra = await _s.ReadOne(id);
                extras.Add(extra);
            }
        }
        catch 
        {
            throw new NullReferenceException(
                $"{typeof(T).Name} no longer exists."
            //  + $"{typeof(T).Name}Id: {extra.Id}"
            );
        }
        return extras;
    }

    private List<string> MapNames(OneOf<List<Filling>, List<Topping>, List<Base>> extras)
    {
       List<string> names = [];
       extras.Switch(
        listA => 
        {
            foreach(var f in listA)
                names.Add(f.Name);
        },
        listB => 
        {
            foreach(var f in listB)
                names.Add(f.Name);
        },
        listC => 
        {
            foreach(var f in listC)
                names.Add(f.Name);
        }
       );
       return names;
    }


}
