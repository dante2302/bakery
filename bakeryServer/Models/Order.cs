using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bakeryServer.Models
{
    public class Order
    {
        [Key] 
        public int Id { get; set; }
        
        [ForeignKey("FoodType")]
        public required int FoodId { get; set; }

        public required DateTime Date { get; set; }

        public int[] Fillings { get; set; }
        public int[] Toppings { get; set; }
        public int[] Base { get; set; }

        public required bool ContainsLettering {get; set;}
        public required bool IsCompleted { get; set; }

        [ForeignKey("User")] 
        public required int UserId { get; set; }
    }
}
