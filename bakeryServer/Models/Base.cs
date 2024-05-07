namespace bakeryServer.Models
{
    public class Base
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int[] UncompatableFillings { get; set; }
        public int[] UncompatableToppings { get; set; }
    }
}