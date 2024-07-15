namespace Models;

public class Topping : IEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int[]? UncompatibleFillings { get; set; }
}