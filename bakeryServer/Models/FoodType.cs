using System.ComponentModel.DataAnnotations;

namespace bakeryServer.Models
{
    public class FoodType
    {
        [Key] public int Id { get; set; }
        public string Name { get; set; }
        public int[] Fillings { get; set; }
        public int[] Toppings { get; set; }
        public bool ContainsLettering { get; set; }
    }
}
