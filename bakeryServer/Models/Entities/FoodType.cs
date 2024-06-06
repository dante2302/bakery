using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Models;

public class FoodType : IEntity
{
    [Key] public int Id { get; set; }
    public required string Name { get; set; }
    public required List<int> Fillings { get; set; } = [];
    public required List<int> Toppings { get; set; } = [];
    public required List<int> Bases { get; set; } = [];
    public bool CanContainLettering { get; set; }

    public FoodType() { }

    [SetsRequiredMembers]
    public FoodType(FoodTypeDTO fDto)
    {
        Id = fDto.Id;
        Name = fDto.Name;
        Fillings = fDto.Fillings.Select(f => f.Id).ToList();
        Toppings = fDto.Toppings.Select(t => t.Id).ToList();
        Bases = fDto.Bases.Select(b => b.Id).ToList();
        CanContainLettering = fDto.CanContainLettering;
    }


}
