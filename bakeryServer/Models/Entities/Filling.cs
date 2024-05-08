namespace bakeryServer.Models
{
    public class Filling : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int[]? UncompatibleToppings { get; set; }
    }
}
