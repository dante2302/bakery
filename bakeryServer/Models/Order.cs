using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bakeryServer.Models
{
    public class Order
    {
        [Key] 
        public int Id { get; set; }
        
        [ForeignKey("FoodType")]
        public int FoodId { get; set; }

        public DateTime Date { get; set; }

        public int[] Fillings { get; set; }
        public int[] Toppings { get; set; }

        public required bool ContainsLettering {get; set;}

        [ForeignKey("User")] 
        public int UserId { get; set; }
    }
}
