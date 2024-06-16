namespace Models;

public class FoodTypeDTO
{
    public FoodTypeDTO(FoodType f, FoodTypeExtras fExtras)
    {
     Id = f.Id;
     Name = f.Name;
     Toppings = fExtras.Toppings;
     Fillings = fExtras.Fillings;
    Bases = fExtras.Bases;
     CanContainLettering = f.CanContainLettering;
    }

    public FoodTypeDTO(){}

    public int Id { get; set; }
    public string Name { get; set; }
    public List<Topping> Toppings { get; set; }
    public List<Filling> Fillings { get; set; }
    public List<Base> Bases { get; set; }
    public bool CanContainLettering { get; set; }
}
