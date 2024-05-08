namespace bakeryServer.Models;

public class OrderDTO(
    Order o,
    FoodTypeAdminDTO Food,
    UserDTO userData,
    FoodTypeExtraNames f
    )
{
    public int Id = o.Id;
    public UserDTO UserData = userData;
    public DateTime Date = o.Date;
    public FoodTypeAdminDTO Food = Food;
    public List<string> FillingNames = f.FillingNames;
    public List<string> ToppingNames = f.ToppingNames;
    public List<string> BaseNames = f.BaseNames;
}
