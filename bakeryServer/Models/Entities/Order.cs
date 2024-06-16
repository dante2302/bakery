using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;
public class Order : IEntity
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("FoodType")]
    public required int FoodId { get; set; }
    public DateTime Date { get; set; }

    public int[] Fillings { get; set; }
    public int[] Toppings { get; set; }
    public int[] Bases { get; set; }

    public string AdditionalMessage { get; set; }
    public required bool ContainsLettering { get; set; }
    public bool IsCompleted { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
}
