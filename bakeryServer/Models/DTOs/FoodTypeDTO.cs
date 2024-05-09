namespace Models;

public class FoodTypeDTO(FoodType f, FoodTypeExtras fExtras)
{
    public int id = f.Id;
    public string Name = f.Name;
    public List<Topping> Toppings = fExtras.Toppings;
    public List<Filling> Fillings = fExtras.Fillings;
    public List<Base> Bases = fExtras.Bases;
    public bool CanContainLettering = f.CanContainLettering; 
}
