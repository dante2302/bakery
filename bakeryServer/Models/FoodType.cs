using System.ComponentModel.DataAnnotations;

namespace bakeryServer.Models
{
    public class FoodType
    {
        [Key] public int Id { get; set; }
        public required string Name { get; set; }
        public required List<int> Fillings { get; set; }
        public required List<int> Toppings { get; set; }
        public required List<int> Bases { get; set; }
        public bool CanContainLettering { get; set; }
    }
}
