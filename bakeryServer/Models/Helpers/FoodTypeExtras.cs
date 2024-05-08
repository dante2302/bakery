using System.ComponentModel.DataAnnotations;

namespace bakeryServer.Models
{
    public class FoodTypeExtras(List<Filling> f, List<Topping> t,List<Base> b)
    {
        public List<Filling> Fillings = f;
        public List<Topping> Toppings = t;
        public List<Base> Bases = b;
    }

}