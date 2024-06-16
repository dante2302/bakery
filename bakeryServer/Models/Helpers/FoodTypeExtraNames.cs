namespace Models;

public class FoodTypeExtraNames(List<string> f, List<string> t, List<string> b)
{
    public List<string> FillingNames = f;
    public List<string> ToppingNames = t;
    public List<string> BaseNames = b;
}