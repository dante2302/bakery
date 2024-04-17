namespace bakeryServer.Models;

public class OrderDTO(Order o, FoodTypeDTO Food, List<string> FillingNames, List<string> ToppingNames)
{
    public int Id = o.Id;
    public int UserId = o.UserId;
    public DateTime Date = o.Date;
    public FoodTypeDTO Food = Food;
    public List<string> FillingNames = FillingNames;
    public List<string> ToppingNames = ToppingNames;
}
