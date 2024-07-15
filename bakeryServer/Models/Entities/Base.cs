namespace Models;

public class Base : IEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int[] UncompatableFillings { get; set; }
    public int[] UncompatableToppings { get; set; }
}
