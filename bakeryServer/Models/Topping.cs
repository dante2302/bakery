namespace bakeryServer.Models
{
    public class Topping
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int[]? UncompatibleFillings { get; set; }
    }
}
