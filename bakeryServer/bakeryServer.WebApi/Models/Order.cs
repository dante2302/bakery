using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bakeryServer.Models
{
    public class Order
    {
        [Key] 
        public int Id { get; set; }

        public int FoodId { get; set; }
        public DateTime Date { get; set; }

        [ForeignKey("User")] 
        public int UserId { get; set; }
    }
}
